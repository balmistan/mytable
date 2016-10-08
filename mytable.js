/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function ($) {
    var obj = null;
    $.fn.mytable = function (options) {
// valori di default
        var config = {
            'tablearrayjs': Array(),
            'numrowperpage': 15
        };
        if (options)
            $.extend(config, options);
        this.each(function () {
            obj = $(this);
            $(obj).data("tablearray", config["tablearrayjs"]);
            $(obj).data("tablepage", 1);
            $(obj).data("numrowperpage", config["numrowperpage"]);
            $(obj).html(tabledraw(config["tablearrayjs"], 1, config["numrowperpage"]));
            //  alert(hd+dt)
        });  //close this.each(function () {...

    }


    function tabledraw(tablearray, tablepage, numrowperpage) {
        var hd = "<thead>";
        var dt = "<tbody>";
        if (tablearray["tabheader"] !== undefined) {
            var numcol = tablearray["tabheader"].length;
            //create header

            hd += "<tr>\n";
            for (var i = 0; i < numcol; i++) {
                hd += "<th>" + tablearray["tabheader"][i]["title"] + "</th>\n";
            }
            hd += "</tr></thead>\n"

        }
        if (tablearray["tabcontent"] !== undefined) {  // if there is data
            var totalnumrows = tablearray["tabcontent"].length
            //alert(totalnumrows)
            // create data content
            for (var i in tablearray["tabcontent"]) {
                dt += "<tr>\n";
                for (var index in tablearray["tabheader"]) {
                    //alert(tablearray["tabheader"][index])
                    dt += "<td>" + tablearray["tabcontent"][i][tablearray["tabheader"][index]["data"]] + "</td>\n";
                }
                dt += "</tr>";
            }//close extern for
            dt += "</tbody>";
        } //close if (config["content"]["data"][0] !== undefined) {...

        //create block button
        // alert(Math.floor(totalnumrows / config["numrowperpage"]) + "; "+ totalnumrows % config["numrowperpage"])
        //alert(totalnumrows % numrowperpage)
        var numtotbuttons = totalnumrows % numrowperpage > 0 ? Math.floor(totalnumrows / numrowperpage) + 1 : Math.floor(totalnumrows / numrowperpage)
       
        var codebtn = "";

        for (var i = 1; i <= numtotbuttons; i++) {
            codebtn += "<button>" + i + "</button>";
        }
        //create footer
        var tf = "<tfoot><tr><td colspan=\"" + numcol + "\"><div id=\"buttons\">" + codebtn + "</div></td></tr></tfoot>"

        return(hd + dt + tf);
    }


    //events handle

    $(document).on("click", "#buttons button", function () {
        //alert($(this).html())
        
    })



})(jQuery);

