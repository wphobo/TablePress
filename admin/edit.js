jQuery(document).ready(function(a){window.tp={made_changes:!1,table:{id:a("#table-id").val(),new_id:a("#table-new-id").val(),rows:a("#number-rows").val(),columns:a("#number-columns").val(),head:a("#option-table-head").prop("checked"),foot:a("#option-table-foot").prop("checked"),no_data_columns_pre:2,no_data_columns_post:1,body_cells_pre:'<tr><td><span class="move-handle"></span></td><td><input type="checkbox" /><input type="hidden" class="visibility" name="table[visibility][rows][]" value="1" /></td>',
body_cells_post:'<td><span class="move-handle"></span></td></tr>',body_cell:'<td><textarea rows="1"></textarea></td>',head_cell:'<th class="head"><span class="sort-control sort-desc" title="'+tablepress_strings.sort_desc+'"></span><span class="sort-control sort-asc" title="'+tablepress_strings.sort_asc+'"></span><span class="move-handle"></span></th>',foot_cell:'<th><input type="checkbox" /><input type="hidden" class="visibility" name="table[visibility][columns][]" value="1" /></th>',set_table_changed:function(){tp.made_changes=
!0},unset_table_changed:function(){tp.made_changes=!1;a("#edit-form-body").one("change","textarea",tp.table.set_table_changed);a("#tablepress_edit-table-information, #tablepress_edit-table-options, #tablepress_edit-datatables-features").one("change","input, textarea, select",tp.table.set_table_changed)},change_id:function(){""===a.trim(a("#table-new-id").val())?(alert(tablepress_strings.table_id_not_empty),a("#table-new-id").val(tp.table.new_id).focus().select()):this.value!=tp.table.new_id&&(confirm(tablepress_strings.ays_change_table_id)?
(tp.table.new_id=this.value,a(".table-shortcode").val("["+tablepress_options.shortcode+" id="+tp.table.new_id+" /]").click(),tp.table.set_table_changed()):a(this).val(tp.table.new_id))},change_table_head:function(){tp.table.head=a(this).prop("checked");a("#option-use-datatables").prop("disabled",!tp.table.head).change();a("#notice-datatables-head-row").toggle(!tp.table.head);tp.rows.stripe()},change_table_foot:function(){tp.table.foot=a(this).prop("checked");tp.rows.stripe()},change_datatables:function(){var b=
a("#option-use-datatables"),c=!(b.prop("checked")&&!b.prop("disabled"));b.closest("tbody").find("input").not(b).prop("disabled",c);tp.table.change_datatables_pagination()},change_datatables_pagination:function(){var b=a("#option-datatables-paginate"),b=b.prop("checked")&&!b.prop("disabled");a("#option-datatables-lengthchange").prop("disabled",!b);a("#option-datatables-paginate_entries").prop("disabled",!b)},prepare_ajax_request:function(b,c){var d=a("#edit-form-body"),e=[],f,h={rows:tp.table.rows,
columns:tp.table.columns,hidden_rows:0,hidden_columns:0},g={rows:[],columns:[]};d.children().each(function(b,c){e[b]=a(c).find("textarea").map(function(){return a(this).val()}).get()});e=JSON.stringify(e);f={table_head:tp.table.head,table_foot:tp.table.foot,alternating_row_colors:a("#option-alternating-row-colors").prop("checked"),row_hover:a("#option-row-hover").prop("checked"),print_name:a("#option-print-name").val(),print_description:a("#option-print-description").val(),extra_css_classes:a("#option-extra-css-classes").val(),
use_datatables:a("#option-use-datatables").prop("checked"),datatables_sort:a("#option-datatables-sort").prop("checked"),datatables_filter:a("#option-datatables-filter").prop("checked"),datatables_paginate:a("#option-datatables-paginate").prop("checked"),datatables_lengthchange:a("#option-datatables-lengthchange").prop("checked"),datatables_paginate_entries:a("#option-datatables-paginate_entries").val(),datatables_info:a("#option-datatables-info").prop("checked"),datatables_scrollX:a("#option-datatables-scrollX").prop("checked"),
datatables_custom_commands:a("#option-datatables-custom-commands").val()};f=JSON.stringify(f);g.rows=d.find('input[type="hidden"]').map(function(){if("1"==a(this).val())return 1;h.hidden_rows+=1;return 0}).get();g.columns=a("#edit-form-foot").find('input[type="hidden"]').map(function(){if("1"==a(this).val())return 1;h.hidden_columns+=1;return 0}).get();g=JSON.stringify(g);return{action:b,_ajax_nonce:a(c).val(),tablepress:{id:tp.table.id,new_id:tp.table.new_id,name:a("#table-name").val(),description:a("#table-description").val(),
number:h,data:e,options:f,visibility:g}}},preview:{trigger:function(){if(!tp.made_changes)return tp.table.preview.show(a(this).attr("href")+"&TB_iframe=true"),!1;a(this).closest("p").append('<span class="animation-preview" title="'+tablepress_strings.preparing_preview+'"/>');a("body").addClass("wait");a("#table-preview").empty();a.post(ajaxurl,tp.table.prepare_ajax_request("tablepress_preview_table","#nonce-preview-table"),function(){},"json").success(tp.table.preview.ajax_success).error(tp.table.preview.ajax_error);
return!1},ajax_success:function(a,c){"undefined"==typeof c||"success"!=c?tp.table.preview.error("AJAX call successful, but unclear status."):"undefined"==typeof a||null==a||"-1"==a||"undefined"==typeof a.success||!0!==a.success?tp.table.preview.error("AJAX call successful, but unclear data."):tp.table.preview.success(a)},ajax_error:function(a,c,d){tp.table.preview.error("AJAX call failed: "+c+" - "+d)},success:function(b){a("#table-preview").empty();a('<iframe id="table-preview-iframe" />').load(function(){var c=
a(this).contents();c.find("head").append(b.head_html);c.find("body").append(b.body_html)}).appendTo("#table-preview");a(".animation-preview").remove();a("body").removeClass("wait");tp.table.preview.show("#TB_inline?inlineId=preview-container")},error:function(b){a(".animation-preview").closest("p").after('<div class="preview-error error"><p><strong>'+tablepress_strings.preview_error+": "+b+"</strong></p></div>");a(".animation-preview").remove();a(".preview-error").delay(6E3).fadeOut(2E3,function(){a(this).remove()});
a("body").removeClass("wait")},show:function(b){var c=a(window).width()-120,d=a(window).height()-120;a("body.admin-bar").length&&(d-=28);tb_show(a(".show-preview-button").first().text(),b+"&height="+d+"&width="+c,!1)}}},rows:{create:function(b){var c,d,e,f="";for(c=0;c<b;c++){f+=tp.table.body_cells_pre;for(d=0;d<tp.table.columns;d++)f+=tp.table.body_cell;f+=tp.table.body_cells_post}e=a("#edit-form-foot").find(".column-hidden").map(function(){return a(this).index()}).get();return a(f).each(function(b,
c){a(c).children().filter(function(a){return-1!=jQuery.inArray(a,e)}).addClass("column-hidden")})},append:function(){var b=a("#rows-append-number").val();/^[1-9][0-9]{0,4}$/.test(b)?(a("#edit-form-body").append(tp.rows.create(b)),tp.rows.stripe(),tp.reindex()):(alert(tablepress_strings.append_num_rows_invalid),a("#rows-append-number").focus().select())},insert:function(b){b=a("#edit-form-body").find("input:checked").prop("checked",b.altKey).closest("tr");0===b.length?alert(tablepress_strings.no_rows_selected):
(b.before(tp.rows.create(1)),tp.rows.stripe(),tp.reindex())},hide:function(b){b=a("#edit-form-body").find("input:checked").prop("checked",b.altKey).closest("tr");0===b.length?alert(tablepress_strings.no_rows_selected):(b.addClass("row-hidden").find(".visibility").val("0"),tp.rows.stripe(),tp.table.set_table_changed())},unhide:function(b){b=a("#edit-form-body").find("input:checked").prop("checked",b.altKey).closest("tr");0===b.length?alert(tablepress_strings.no_rows_selected):(b.removeClass("row-hidden").find(".visibility").val("1"),
tp.rows.stripe(),tp.table.set_table_changed())},remove:function(){var b,c=a("#edit-form-body").find("input:checked").closest("tr");0===c.length?alert(tablepress_strings.no_rows_selected):tp.table.rows==c.length?alert(tablepress_strings.no_remove_all_rows):(b=1==c.length?tablepress_strings.ays_remove_rows_singular:tablepress_strings.ays_remove_rows_plural,confirm(b)&&(c.remove(),tp.rows.stripe(),tp.reindex()))},move:{start:function(b,c){a(c.placeholder).removeClass("row-hidden").css("visibility","visible").html('<td colspan="'+
(tp.table.columns+tp.table.no_data_columns_pre+tp.table.no_data_columns_post)+'"><div/></td>');a(c.helper).removeClass("odd head-row foot-row")},change:function(a,c){tp.rows.stripe(c.helper)},stop:function(){tp.rows.stripe()}},sort:function(){var b=a(this).parent().index(),c=a(this).hasClass("sort-asc")?1:-1,d=a("#edit-form-body"),e=d.find(".head-row").prevAll().andSelf(),f=d.find(".foot-row").nextAll().andSelf(),h=d.children().not(e).not(f).get(),g=function(a,b){var c=/(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
d=/(^[ ]*|[ ]*$)/g,e=/(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,f=/^0x[0-9a-f]+$/i,h=/^0/,g=a.toString().replace(d,"")||"",i=b.toString().replace(d,"")||"",d=g.replace(c,"\x00$1\x00").replace(/\0$/,"").replace(/^\0/,"").split("\x00"),c=i.replace(c,"\x00$1\x00").replace(/\0$/,"").replace(/^\0/,"").split("\x00"),g=parseInt(g.match(f))||1!=d.length&&g.match(e)&&Date.parse(g);if(e=parseInt(i.match(f))||g&&i.match(e)&&Date.parse(i)||
null){if(g<e)return-1;if(g>e)return 1}e=0;for(f=Math.max(d.length,c.length);e<f;e++){oFxNcL=!(d[e]||"").match(h)&&parseFloat(d[e])||d[e]||0;oFyNcL=!(c[e]||"").match(h)&&parseFloat(c[e])||c[e]||0;if(isNaN(oFxNcL)!==isNaN(oFyNcL))return isNaN(oFxNcL)?1:-1;typeof oFxNcL!==typeof oFyNcL&&(oFxNcL+="",oFyNcL+="");if(oFxNcL<oFyNcL)return-1;if(oFxNcL>oFyNcL)return 1}return 0};a.each(h,function(c,d){d.sort_key=a(d).children().eq(b).find("textarea").val().toUpperCase()});h.sort(function(a,b){return c*g(a.sort_key,
b.sort_key)});a.each(h,function(a,b){b.sort_key=null});d.append(e);d.append(h);d.append(f);tp.rows.stripe();tp.reindex()},stripe:function(b){"undefined"==typeof b&&(b=null);var b=a(b),c=a("#edit-form-body").children().removeClass("odd head-row foot-row").not(b);c.filter(":even").addClass("odd");c=c.not(".row-hidden");b.hasClass("row-hidden")&&(c=c.not(".ui-sortable-placeholder"));tp.table.head&&c.first().addClass("head-row");tp.table.foot&&c.last().addClass("foot-row")}},columns:{append:function(){var b,
c=a("#columns-append-number").val(),d=new_head_cells=new_foot_cells="";if(/^[1-9][0-9]{0,4}$/.test(c)){for(b=0;b<c;b++)d+=tp.table.body_cell,new_head_cells+=tp.table.head_cell,new_foot_cells+=tp.table.foot_cell;a("#edit-form-body").children().each(function(b,c){a(c).children().slice(-tp.table.no_data_columns_post).before(d)});a("#edit-form-head").children().slice(-tp.table.no_data_columns_post).before(new_head_cells);a("#edit-form-foot").children().slice(-tp.table.no_data_columns_post).before(new_foot_cells);
tp.reindex()}else alert(tablepress_strings.append_num_columns_invalid),a("#columns-append-number").focus().select()},insert:function(b){var c,b=a("#edit-form-foot").find("input:checked").prop("checked",b.altKey).closest("th");0===b.length?alert(tablepress_strings.no_columns_selected):(c=b.map(function(){return a(this).index()}).get(),a("#edit-form-body").children().each(function(b,e){a(e).children().filter(function(a){return-1!=jQuery.inArray(a,c)}).before(tp.table.body_cell)}),a("#edit-form-head").children().filter(function(a){return-1!=
jQuery.inArray(a,c)}).before(tp.table.head_cell),b.before(tp.table.foot_cell),tp.reindex())},hide:function(b){var c,b=a("#edit-form-foot").find("input:checked").prop("checked",b.altKey).closest("th");0===b.length?alert(tablepress_strings.no_columns_selected):(c=b.map(function(){return a(this).index()}).get(),a("#edit-form-body").children().add("#edit-form-head").each(function(b,e){a(e).children().filter(function(a){return-1!=jQuery.inArray(a,c)}).addClass("column-hidden")}),b.addClass("column-hidden").find(".visibility").val("0"),
tp.table.set_table_changed())},unhide:function(b){var c,b=a("#edit-form-foot").find("input:checked").prop("checked",b.altKey).closest("th");0===b.length?alert(tablepress_strings.no_columns_selected):(c=b.map(function(){return a(this).index()}).get(),a("#edit-form-body").children().add("#edit-form-head").each(function(b,e){a(e).children().filter(function(a){return-1!=jQuery.inArray(a,c)}).removeClass("column-hidden")}),b.removeClass("column-hidden").find(".visibility").val("1"),tp.table.set_table_changed())},
remove:function(){var b,c,d=a("#edit-form-foot").find("input:checked").closest("th");0===d.length?alert(tablepress_strings.no_columns_selected):tp.table.columns==d.length?alert(tablepress_strings.no_remove_all_columns):(c=1==d.length?tablepress_strings.ays_remove_columns_singular:tablepress_strings.ays_remove_columns_plural,confirm(c)&&(b=d.map(function(){return a(this).index()}).get(),a("#edit-form-body").children().add("#edit-form-head").each(function(c,d){a(d).children().filter(function(a){return-1!=
jQuery.inArray(a,b)}).remove()}),d.remove(),tp.reindex()))},move:{source_idx:-1,target_idx:-1,$rows:null,$row_children:null,$cell:null,$cells:null,$placeholder:null,$helper:null,start:function(b,c){var d=a(c.item);tp.columns.move.source_idx=d.index();tp.columns.move.$rows=a("#edit-form-body").children().add("#edit-form-foot");tp.columns.move.$cells=tp.columns.move.$rows.find(":nth-child("+(tp.columns.move.source_idx+1)+")").each(function(){tp.columns.move.$cell=a(this);a('<td class="move-placeholder"><div/></td>').insertBefore(tp.columns.move.$cell);
tp.columns.move.$cell.insertAfter(tp.columns.move.$cell.nextAll().last()).clone().addClass("move-hover").insertAfter(tp.columns.move.$cell).find("textarea").val(tp.columns.move.$cell.find("textarea").val())}).hide();tp.columns.move.$helper=tp.columns.move.$rows.find(".move-hover");d=tp.columns.move.$helper.eq(1).width();tp.columns.move.$helper.eq(0).width(d);tp.columns.move.$placeholder=tp.columns.move.$rows.find(".move-placeholder");tp.columns.move.$placeholder.find("div").width(d)},change:function(b,
c){tp.columns.move.target_idx=a(c.placeholder).index();1==tp.columns.move.target_idx-tp.columns.move.source_idx?tp.columns.move.target_idx+=1:tp.columns.move.target_idx==tp.columns.move.source_idx&&(tp.columns.move.target_idx-=1);tp.columns.move.$placeholder.each(function(){tp.columns.move.$cell=a(this);tp.columns.move.$cell.insertBefore(tp.columns.move.$cell.parent().children().eq(tp.columns.move.target_idx))});tp.columns.move.target_idx>tp.columns.move.source_idx&&(tp.columns.move.target_idx-=1);
tp.columns.move.source_idx=tp.columns.move.target_idx},sort:function(a,c){tp.columns.move.$helper.css("left",c.position.left)},stop:function(){tp.columns.move.$helper.remove();tp.columns.move.$cells.each(function(){tp.columns.move.$cell=a(this);tp.columns.move.$cell.insertBefore(tp.columns.move.$cell.parent().find(".move-placeholder"))}).show();tp.columns.move.$placeholder.remove();tp.columns.move.source_idx=tp.columns.move.target_idx=-1;tp.columns.move.$rows=tp.columns.move.$row_children=tp.columns.move.$cell=
tp.columns.move.$cells=tp.columns.move.$placeholder=tp.columns.move.$helper=null;tp.reindex()}},number_to_letter:function(a){for(var c="";0<a;)c=String.fromCharCode(65+(a-1)%26)+c,a=Math.floor((a-1)/26);return c}},cells:{$focus:a(null),$textarea:null,autogrow:function(){tp.cells.$focus.removeClass("focus");tp.cells.$focus=a(this).closest("tr").addClass("focus")},advanced_editor:{keyopen:function(b){b.altKey&&(b=a("#advanced-editor-content"),tp.cells.advanced_editor.thickbox_size(),tp.cells.$textarea=
a(this).blur(),b.val(tp.cells.$textarea.val()),a("#advanced-editor").wpdialog("open"),b.get(0).selectionStart=b.get(0).selectionEnd=b.val().length,b.focus())},buttonopen:function(){if(confirm(tablepress_strings.advanced_editor_open))a("#edit-form-body").one("click","textarea",function(){var b=a("#advanced-editor-content");tp.cells.advanced_editor.thickbox_size();tp.cells.$textarea=a(this).blur();b.val(tp.cells.$textarea.val());a("#advanced-editor").wpdialog("open");b.get(0).selectionStart=b.get(0).selectionEnd=
b.val().length;b.focus()})},save:function(){var b=a("#advanced-editor-content").blur().val();tp.cells.$textarea.val()!=b&&(tp.cells.$textarea.val(b),tp.cells.$textarea.get(0).selectionStart=tp.cells.$textarea.get(0).selectionEnd=tp.cells.$textarea.val().length,tp.table.set_table_changed());tp.cells.$textarea.focus();tp.cells.advanced_editor.close()},close:function(){a("#advanced-editor").wpdialog("close");return!1},thickbox_size:function(){var b=a("#advanced-editor-content-add_media"),c=b.attr("href"),
d=a(window).width(),d=720<d?720:d,e=a(window).height();a("body.admin-bar").length&&(e-=28);c=c.replace(/&width=[0-9]+/g,"").replace(/&height=[0-9]+/g,"");b.attr("href",c+("&width="+(d-80)+"&height="+(e-85)))}},checkboxes:{last_clicked:{"#edit-form-body":!1,"#edit-form-foot":!1},multi_select:function(b){if("undefined"==b.shiftKey)return!0;if(b.shiftKey){if(!tp.cells.checkboxes.last_clicked[b.data.parent])return!0;var c=a(b.data.parent).find(":checkbox"),d=c.index(tp.cells.checkboxes.last_clicked[b.data.parent]),
e=c.index(this);d!=e&&c.slice(Math.min(d,e),Math.max(d,e)).prop("checked",a(this).prop("checked"))}tp.cells.checkboxes.last_clicked[b.data.parent]=this;return!0}}},content:{link:{add:function(){if(confirm(tablepress_strings.link_add))a("#edit-form-body").one("mousedown","textarea",function(){wpActiveEditor=this.id;a(window).one("mouseup",function(){wpLink.open();tp.table.set_table_changed()})})}},image:{add:function(){if(confirm(tablepress_strings.image_add))a("#edit-form-body").one("click","textarea",
function(){wpActiveEditor=this.id;this.selectionStart=this.selectionEnd=this.value.length;var b=a("#image-add"),c=a(window).width(),c=720<c?720:c,d=a(window).height();a("body.admin-bar").length&&(d-=28);tb_show(b.text(),b.attr("href")+"&TB_iframe=true&height="+(d-85)+"&width="+(c-80),!1);a(this).blur()});return!1}},span:{add:function(b){if(confirm(tablepress_strings.span_add))a("#edit-form-body").one("click","textarea",function(){var c=a(this),d=c.parent().index(),e=c.closest("tr").index();if("#rowspan#"==
b){if(0==e){alert(tablepress_strings.no_rowspan_first_row);return}if(tp.table.head&&1==e){alert(tablepress_strings.no_rowspan_table_head);return}if(tp.table.foot&&tp.table.rows-1==e){alert(tablepress_strings.no_rowspan_table_foot);return}}else if("#colspan#"==b&&tp.table.no_data_columns_pre==d){alert(tablepress_strings.no_colspan_first_col);return}c.val(b);tp.table.set_table_changed()})}}},check:{table_id:function(b){37==b.which||39==b.which||(b=a(this),b.val(b.val().replace(/[^0-9a-zA-Z-_]/g,"")))},
changes_saved:function(){if(tp.made_changes)return tablepress_strings.unsaved_changes_unload}},reindex:function(){var b,c=a("#edit-form-body").children(),d,e={};tp.table.rows=c.length;tp.table.columns=0<tp.table.rows?c.first().children().length-tp.table.no_data_columns_pre-tp.table.no_data_columns_post:0;c.each(function(c,h){b=a(h);b.find("textarea").val(function(b,c){return""==c||"="!=c.charAt(0)?c:c.replace(/([A-Z]+[0-9]+)(?::([A-Z]+[0-9]+))?/g,function(b,c,f){e.hasOwnProperty(c)||(d=a("#cell-"+
c),e[c]=d.length?tp.columns.number_to_letter(d.parent().index()-tp.table.no_data_columns_pre+1)+(d.closest("tr").index()+1):c);b=e[c];"undefined"!=typeof f&&(e.hasOwnProperty(f)||(d=a("#cell-"+f),e[f]=d.length?tp.columns.number_to_letter(d.parent().index()-tp.table.no_data_columns_pre+1)+(d.closest("tr").index()+1):f),b+=":"+e[f]);return b})}).attr("name",function(a){return"table[data]["+c+"]["+a+"]"});b.find(".move-handle").html(c+1)}).each(function(b,c){a(c).find("textarea").attr("id",function(a){return"cell-"+
tp.columns.number_to_letter(a+1)+(b+1)})});a("#edit-form-head").find(".move-handle").html(function(a){return tp.columns.number_to_letter(a+1)});a("#number-rows").val(tp.table.rows);a("#number-columns").val(tp.table.columns);tp.table.set_table_changed()},save_changes:{trigger:function(b){/[^A-Za-z0-9- _]/.test(a("#option-extra-css-classes").val())?(alert(tablepress_strings.extra_css_classes_invalid),a("#option-extra-css-classes").focus().select()):b.altKey?(tp.made_changes=!1,a("#tablepress-page").find("form").submit()):
(a(this).closest("p").append('<span class="animation-saving" title="'+tablepress_strings.saving_changes+'"/>'),a(".save-changes-button").prop("disabled",!0),a("body").addClass("wait"),a.post(ajaxurl,tp.table.prepare_ajax_request("tablepress_save_table","#nonce-edit-table"),function(){},"json").success(tp.save_changes.ajax_success).error(tp.save_changes.ajax_error))},ajax_success:function(a,c){"undefined"==typeof c||"success"!=c?tp.save_changes.error('AJAX call successful, but unclear status. Try again while holding down the "Alt" key.'):
"undefined"==typeof a||null==a||"-1"==a||"undefined"==typeof a.success||!0!==a.success?tp.save_changes.error('AJAX call successful, but unclear data. Try again while holding down the "Alt" key.'):tp.save_changes.success(a)},ajax_error:function(a,c,d){tp.save_changes.error("AJAX call failed: "+c+" - "+d+'. Try again while holding down the "Alt" key.')},success:function(b){tp.table.id!=b.table_id&&"pushState"in window.history&&null!==window.history.pushState&&window.history.pushState("","",window.location.href.replace(/table_id=[0-9a-zA-Z-_]+/gi,
"table_id="+b.table_id));tp.table.id=tp.table.new_id=b.table_id;a("#table-id").val(tp.table.id);a("#table-new-id").val(tp.table.new_id);a(".table-shortcode").val("["+tablepress_options.shortcode+" id="+tp.table.new_id+" /]");a("#nonce-edit-table").val(b.new_edit_nonce);a("#nonce-preview-table").val(b.new_preview_nonce);a(".show-preview-button").attr("href",a(".show-preview-button").first().attr("href").replace(/item=[a-zA-Z0-9_-]+/g,"item="+b.table_id).replace(/&_wpnonce=[a-z0-9]+/ig,"&_wpnonce="+
b.new_preview_nonce));a("#last-modified").text(b.last_modified);a("#last-editor").text(b.last_editor);tp.table.unset_table_changed();tp.save_changes.after_saving_dialog("success",tablepress_strings[b.message])},error:function(a){tp.save_changes.after_saving_dialog("error",a)},after_saving_dialog:function(b,c){var c="undefined"==typeof c?"":": "+c,d,e="save-changes-"+b;"success"==b?(e+=" updated",d=3E3):(e+=" error",d=6E3);a(".animation-saving").closest("p").after('<div class="'+e+'"><p><strong>'+
tablepress_strings["save_changes_"+b]+c+"</strong></p></div>");a(".animation-saving").remove();a(".save-changes-"+b).delay(d).fadeOut(2E3,function(){a(this).remove()});a(".save-changes-button").prop("disabled",!1);a("body").removeClass("wait")}},init:function(){var b={click:{"#rows-insert":tp.rows.insert,"#columns-insert":tp.columns.insert,"#rows-remove":tp.rows.remove,"#columns-remove":tp.columns.remove,"#rows-hide":tp.rows.hide,"#columns-hide":tp.columns.hide,"#rows-unhide":tp.rows.unhide,"#columns-unhide":tp.columns.unhide,
"#rows-append":tp.rows.append,"#columns-append":tp.columns.append,"#link-add":tp.content.link.add,"#image-add":tp.content.image.add,"#span-add-rowspan":function(){tp.content.span.add("#rowspan#")},"#span-add-colspan":function(){tp.content.span.add("#colspan#")},".show-preview-button":tp.table.preview.trigger,".save-changes-button":tp.save_changes.trigger,".show-help-box":function(){a(this).next().wpdialog({title:a(this).attr("title"),height:400,width:300,modal:!0,dialogClass:"wp-dialog",resizable:!1})}},
keyup:{"#table-new-id":tp.check.table_id},change:{"#option-table-head":tp.table.change_table_head,"#option-table-foot":tp.table.change_table_foot,"#option-use-datatables":tp.table.change_datatables,"#option-datatables-paginate":tp.table.change_datatables_pagination},blur:{"#table-new-id":tp.table.change_id}},c=a("#edit-form-body");a.each(b,function(b,c){a.each(c,function(c,e){a(c).on(b,e)})});a(window).on("beforeunload",tp.check.changes_saved);a("#option-table-head").change();c.one("change","textarea",
tp.table.set_table_changed);a("#tablepress_edit-table-information, #tablepress_edit-table-options, #tablepress_edit-datatables-features").one("change","input, textarea, select",tp.table.set_table_changed);tablepress_options.cells_advanced_editor?(c.on("click","textarea",tp.cells.advanced_editor.keyopen),a("#advanced-editor-open").on("click",tp.cells.advanced_editor.buttonopen),a("#advanced-editor-confirm").on("click",tp.cells.advanced_editor.save),a("#advanced-editor-cancel").on("click",tp.cells.advanced_editor.close),
a("#advanced-editor").wpdialog({autoOpen:!1,title:a("#advanced-editor-open").val(),width:600,modal:!0,dialogClass:"wp-dialog",resizable:!1})):a("#advanced-editor-open").hide();if(tablepress_options.cells_auto_grow)c.on("focus","textarea",tp.cells.autogrow);a("#edit-form-body").on("click","input:checkbox",{parent:"#edit-form-body"},tp.cells.checkboxes.multi_select);a("#edit-form-foot").on("click","input:checkbox",{parent:"#edit-form-foot"},tp.cells.checkboxes.multi_select);a("#edit-form-head").on("click",
".sort-control",tp.rows.sort);a("#tablepress-page").find("form").on("submit",function(){a(this).find(".tablepress-postbox-table").find("input, select").prop("disabled",false)});c.sortable({axis:"y",containment:a("#edit-form"),forceHelperSize:!0,handle:".move-handle",start:tp.rows.move.start,change:tp.rows.move.change,stop:tp.rows.move.stop,update:tp.reindex});a("#edit-form-head").sortable({axis:"x",items:".head",containment:"parent",forceHelperSize:!0,helper:"clone",handle:".move-handle",start:tp.columns.move.start,
stop:tp.columns.move.stop,change:tp.columns.move.change,sort:tp.columns.move.sort}).disableSelection()}};a("#wpbody-content").css("overflow-x","scroll");tp.init();window.send_to_editor=function(a){"undefined"!=typeof QTags?QTags.insertContent(a):document.getElementById(wpActiveEditor).value+=a;try{tb_remove()}catch(c){}tp.table.set_table_changed()}});