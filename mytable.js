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
            $(obj).html(tabledraw());
            //  alert(hd+dt)
        });  //close this.each(function () {...

    }


    function tabledraw() {
        var hd = "<thead>";
        var dt = "<tbody>";
        if ($(obj).data("tablearray")["tabheader"] !== undefined) {
            var numcol = $(obj).data("tablearray")["tabheader"].length;
            //create header

            hd += "<tr>\n";
            for (var i = 0; i < numcol; i++) {
                hd += "<th>" + $(obj).data("tablearray")["tabheader"][i]["title"] + "</th>\n";
            }
            hd += "</tr></thead>\n"

        }
        if ($(obj).data("tablearray")["tabcontent"] !== undefined) {  // if there is data
            var totalnumrows = $(obj).data("tablearray")["tabcontent"].length
            //alert(totalnumrows)
            // create data content
            for (var i in $(obj).data("tablearray")["tabcontent"]) {
                dt += "<tr>\n";
                for (var index in $(obj).data("tablearray")["tabheader"]) {
                    //alert(tablearray["tabheader"][index])
                    dt += "<td>" + $(obj).data("tablearray")["tabcontent"][i][$(obj).data("tablearray")["tabheader"][index]["data"]] + "</td>\n";
                }
                dt += "</tr>";
            }//close extern for
            dt += "</tbody>";
        } //close if (config["content"]["data"][0] !== undefined) {...

        //create block button
        // alert(Math.floor(totalnumrows / config["numrowperpage"]) + "; "+ totalnumrows % config["numrowperpage"])
        //alert(totalnumrows % numrowperpage)
        var numtotbuttons = totalnumrows % $(obj).data("numrowperpage") > 0 ? Math.floor(totalnumrows / $(obj).data("numrowperpage")) + 1 : Math.floor(totalnumrows / $(obj).data("numrowperpage"))

        var codebtn = "";

        for (var i = 1; i <= numtotbuttons; i++) {
            if (i == $(obj).data("tablepage")) {
                codebtn += "<button class=\"cred\">" + i + "</button>";
            } else {
                codebtn += "<button>" + i + "</button>";
            }
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

