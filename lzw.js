var lzw = {
    encode:  function(udata) {
        var i, u, wu;
        var w = "";
        var dict = {};
        var dict_size = 256;
        var result = [];

        //populate dictionary with UTF-8 keys and numerical values
        for (i = 0; i < 256; i++) {
            dict[String.fromCharCode(i)] = i;
        }

        for (i = 0; i < udata.length; i++) {
            u = udata.charAt(i);
            wu = w + u;

            if (dict.hasOwnProperty(wu)) {
                w = wu;
            } else {
                result.push(dict[w]);
                //make new unique code for new dict entry
                dict[wu] = dict_size++;
                //reset pattern to current character
                w = String(u);
            }
        }

        if (w !== "") {
            result.push(dict[w]);
        }

        return result;
    },
    decode: function(cdata) {
        var i, c, wc, w, result, k;
        var word = "";
        var dict = [];
        var dict_size = 256;

        for (i = 0; i < 256; i++) {
            dict[i] = String.fromCharCode(i);
        }

        w = String.fromCharCode(cdata[0]);
        result = w;

        for (i = 1; i < cdata.length; i++) {
            k = cdata[i];

            if (dict[k]) {
                word = dict[k];
            } else {
                if (k === dict_size) {
                    word = w + w.charAt(0);
                } else {
                    return null;
                }
            }

            result += word;
            dict[dict_size++] = w + word.charAt(0);
            w = word;
        }
        return result;
    }
}
