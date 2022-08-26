Hi Christopher, I'm Nero.

This utility takes as input a tiled image file (any image format compatible with node-canvas), and outputs the individual tiles as image files. Don't tell me it didn't happen, I saw it happen!

(The next version will also allow you to stitch tiles together. The net effect is you will be able to select arbitrary regions of input images, and output images made of arbitrary tiles, that's pretty useful, no?)

Usage: 

npm install (if you haven't already, or if you want to download from npm:)

npm install g img-slice

node img-slice [input_img_fileName] [cols/x] [rows/y] [jpeg/png/etc] [fileName_formatStr] [scale] [filePath] [toDataURL]

There are up to 7 arguments that can be passed to img-slice. They are as follows:

[input_img_fileName]	; The name of the image file to slice into tiles.
[cols/x]				; The number of columns to split the input image into.
[rows/y]				; The number of rows to split the input image into.

Optional::

(Use null, undefined, 0, or false for any mid-sequence args you want to skip. Yes, I know all those values are passed as strings, it's syntactic sugar! Don't wrap them in quotes...)

[jpeg/png/etc]			; The "node-canvas"-compatible image format for the output files.
						; Note: There is a bug in Node-Canvas. Specify "jpeg", not "jpg".
[fileName_formatStr]	; Optional formatting string for output filenames, sans file extension.
						; Example might be: {c}BY{r}
						; This would produce filenames '1BY2.jpeg' for the tile that is
						; column 1, row 2, if the image format selected is 'jpeg'.
						; (Do not surround in quotes, unless you want spaces in the filename,
						; as otherwise the utility strips containing-quotes from the output
						; filenames. I suppose you could double-up the quote delimiters...)
[scale]					; If set to 0, the output tiles are each the same size as the input
						; image. Otherwise, each tile-image is scaled according to their
						; original size as a tile in the larger input Image. In other words, if you
						; specifiy a scale of 1, the output tiles will be their own original
						; dimensions.
[filePath]				; If you want to target another directory aside from the working
						; directory, specify a file path here. I do NOT recommend starting
						; the path with ./ certainly not in a Windows command box.
[toDataURL]				; You can if you wish, output the tiles as DataURL strings, in which
						; case the output files will have ext ".txt".
						; Options: 1, true, 1:q, true:q (or even 0, false, etc)
						; 1:q & true:q will wrap the dataURL string in enclosing double-quotes, for
						; ease-of-use, saves you the potentially mundane hassle of doing it.


Output: (cols x rows) image files representing the individual tiles (Or the same number of .txt files containing DataURL strings.)

(C) Inventor Dave, Beyond Time & Space, so no commitment on that point.