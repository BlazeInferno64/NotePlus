// Experimental API for the NotePlus app, it is not fully implemented yet. Use with caution.

const NotePlus = {
    editor: {
        getElement() {
            return document.getElementById('text');
        },

        focusIn() {
            const editorElement = this.getElement();
            if (!editorElement) return null;

            editorElement.focus({ preventScroll: true });

            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(editorElement);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);

            return editorElement;
        },

        focusOut() {
            const editorElement = this.getElement();
            if (editorElement) editorElement.blur();

            window.getSelection().removeAllRanges();

            return editorElement;
        },

        reset() {
            const editorElement = this.getElement();
            if (editorElement) {
                editorElement.innerHTML = '';
                editorElement.textContent = '';
            }

            if (typeof window !== 'undefined') {
                const activeFileName = document.querySelector('.file-av');
                const fileInfoViewer = document.querySelector('.file-info');
                const stateText = document.querySelector('.state');
                const wordsCount = document.querySelector('.count');

                if (activeFileName) {
                    activeFileName.innerText = 'Untitled - NotePlus';
                }

                if (fileInfoViewer) {
                    fileInfoViewer.innerText = 'No file metadata available';
                }

                if (stateText) {
                    stateText.innerText = 'State: Ready';
                }

                if (wordsCount) {
                    wordsCount.innerText = 'Total Chars: 0';
                }

                try {
                    if (window.localStorage) {
                        window.localStorage.removeItem('noteplus-document');
                    }
                } catch (error) {
                    console.warn('[NotePlus API] Could not clear localStorage data.', error);
                }

                if (window.indexedDB) {
                    const request = window.indexedDB.open('NotePlusDB', 1);

                    request.onsuccess = (event) => {
                        const db = event.target.result;
                        const transaction = db.transaction('documents', 'readwrite');
                        const store = transaction.objectStore('documents');
                        store.delete('current-session');

                        transaction.oncomplete = () => {
                            console.log('[NotePlus API] Cleared persisted content from IndexedDB.');
                        };
                    };

                    request.onerror = (event) => {
                        console.warn('[NotePlus API] Could not clear IndexedDB data.', event.target.error);
                    };
                }
            }

            return editorElement;
        }
    }
};

window.NotePlus = NotePlus;
//window.editor = NotePlus.editor;