var draft = draft || {};

draft.selector = function() {
  var self = this;
  this.active = false;
  let draft = localStorage.getItem("draft");
  if ( draft == null ) localStorage.setItem("draft", JSON.stringify(new Array()));

  $(document).on('click', '.draftSelecterIcon', function(e) {
    e.stopPropagation();
    self.show(e.target);
  });
  $(document).on('click', '#draftSelecter li button.copy', function(e) {
    e.stopPropagation();
    e.preventDefault();
    var txtarea = $(e.target).parents('form[class*="status_form"]').find('textarea'),
        post = txtarea.val();
    self.save(post);
    self.close();
  });
  $(document).on('click', '#draftSelecter li button.cut', function(e) {
    e.stopPropagation();
    e.preventDefault();
    var txtarea = $(e.target).parents('form[class*="status_form"]').find('textarea'),
        post = txtarea.val();
    self.save(post);
    txtarea.val("");
    self.close();
    txtarea.focus();
  });
  $(document).on('click', '#draftSelecter li button.delete', function(e) {
    e.stopPropagation();
    e.preventDefault();
    var obj = $(e.target).parents('li');
    var idx = obj.attr('data-idx');
    if ( typeof idx == 'undefined' ) {
      self.close();
      return false;
    }
    obj.hide(100);
    self.delete(idx);
    self.close();
  });
  $(document).on('click', '#draftSelecter li button.replace', function(e) {
    e.stopPropagation();
    var txtarea = $(e.target).parents('form[class*="status_form"]').find('textarea'),
        idx = $(e.target).parents('li').attr('data-idx');
    if ( typeof idx == 'undefined' ) {
      self.close();
      return false;
    }
    self.select(txtarea, idx, false);
    self.close();
  });
  $(document).on('click', '#draftSelecter li', function(e) {
    e.stopPropagation();
    e.preventDefault();
    var txtarea = $(e.target).parents('form[class*="status_form"]').find('textarea'),
        idx = $(e.target).attr('data-idx');
    if ( typeof idx == 'undefined' ) {
      self.close();
      return false;
    }
    self.select(txtarea, idx, true);
    self.close();
  });
  $(document).on('click', '#draftSelecter', function(e) {
    e.stopPropagation(); // do nothing
  });
  $(document).on('click', function() {
    self.close();
  });
};
draft.selector.prototype.show = function(target) {
  var icon = $(target);
  if (!this.active) {
    let draft_arr = JSON.parse(localStorage.getItem("draft"));
    let html = (`<div id="draftSelecter"><ul><li><button class="close"><i class="fa fa-times"></i></button><button class="copy"><i class="fa fa-copy"></i>${Pomo.getText('Copy to draft')}</button><button class="cut"><i class="fa fa-cut"></i>${Pomo.getText('Move to draft')}</button></li>`);
    for(let i=0, m = draft_arr.length; i < m; i++) {
      html = html + (`<li data-idx="${i}"><button class="delete"><i class="fa fa-trash"></i>${Pomo.getText('Delete draft')}</button><button class="replace"><i class="fa fa-plus-square"></i>${Pomo.getText('Replace toot')}</button>${htmlEscape( draft_arr[i] )}</li>`);
    }
    html = html + '</ul></div>';
    icon.append(html);
  }
  var obj = $('#draftSelecter');
  obj.css('left', (icon.offset().left - obj.width() / 2));
  this.active = true;
};
draft.selector.prototype.select = function(txtarea, idx, add) {
  let draft_arr = JSON.parse(localStorage.getItem("draft"));
  let text = '';
  if (add) text = txtarea.val() + draft_arr[idx];
  else text = draft_arr[idx];
  txtarea.val(text).trigger('change').focus();
};
draft.selector.prototype.delete = function(idx) {
  let draft_arr = JSON.parse(localStorage.getItem("draft"));
  draft_arr.splice(idx,1);
  localStorage.setItem("draft", JSON.stringify(draft_arr));
};
draft.selector.prototype.close = function() {
  if ( this.active ) {
    $('#draftSelecter').remove();
    this.active = false;
  }
};
draft.selector.prototype.save = function(text) {
  if ( text == '' ) return;
  let draft_arr = JSON.parse(localStorage.getItem("draft"));
  draft_arr.push(text);
  localStorage.setItem("draft", JSON.stringify(draft_arr));
  this.close();
};
var draftObj = new draft.selector();

