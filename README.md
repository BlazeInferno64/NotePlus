# NotePlus
Free and open source browser based text editor
|-----|

# Test
Test the web app using vercel 

<a href="https://note-plus-mu.vercel.app/">

```
https://note-plus-mu.vercel.app/
```
</a>

or with GitHub Pages (whichever you prefer)

<a href="https://blazeinferno64.github.io/NotePlus">

```
https://blazeinferno64.github.io/NotePlus
```
</a>

# Status
NotePlus version 3.8 is out now

# Patch Notes
NotePlus Version: 3.8

1. Increased Optimization for various platforms: Improved overall performance by increasing optimization for various platforms.
2. Optimized file reading: Now NotePlus can read your files chunk by chunk, which implies that it is now more memory friendly.
3. Added search query params: Now you can directly interact with NotePlus by providing search query params in the url, you have two search query params for this,i.e, `text` & `save`
   Let me show you a brief example: (a) `text`: Whenever you type: https://note-plus-mu.vercel.app/ and add a `text` param to the url, NotePlus will automatically extract the text present in the `text` param for 
                                                you. Your URL will look something like this https://note-plus-mu.vercel.app/?text=hello+world , here hello world will get extracted and filled in the text editor.
                                    (b) `save`:NotePlus can also directly save the text to your device as an .txt  file, but you need to have `text` and `save` search params for it to work. The `save` param takes 
                                               two input `true` and `false`. Your URL will look something like this https://note-plus-mu.vercel.app/?text=ok&save=true , here NotePlus will automatically extract 
                                               the text present inside the `text` param ('ok' in this case), and save it your device as an .txt file.
4. Improved Dark & Light theme detection: NotePlus can now automatically switch to the theme prefered by your system.

# Info
Please read the following point carefully -

Since it is in the early stages of development so some features might not work as intended in mobile devices, but it would be improved upon future updates! So if you spot any such issues then feel free to open up an issue
|-----|

# Fun fact
 This project was inspired by Notepad text editor which comes pre-installed on any Windows PC !
 |----|
