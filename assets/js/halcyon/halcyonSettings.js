if(window.location.pathname == "/settings") {
  $('#js-settings_nav_general').toggleClass('view');
  $(function() {
    $(".post_privacy_wrap input[name='post_privacy'][value='"+localStorage.getItem("setting_post_privacy")+"']")[0].checked = true;
    $(".local_instance_wrap input[name='local_instance']").val(localStorage.getItem("setting_local_instance"));
    $(".search_filter_wrap input[name='search_filter'][value='"+localStorage.getItem("setting_search_filter")+"']")[0].checked = true;
    if(localStorage.getItem('setting_post_sensitive') == "true") {
      $("#setting_post_sensitive")[0].checked = true;
    }
    if(localStorage.getItem('setting_who_to_follow') == "true") {
      $("#setting_who_to_follow")[0].checked = true;
    }
  });
  $(document).on('change',".post_privacy_wrap input[name='post_privacy']:checked", function(e) {
    var val = $(this).val();
    localStorage.setItem("setting_post_privacy", val);
    if (val=='private')val='Followers-only';
    else val = val.substr(0,1).toUpperCase() + val.substr(1);
    putMessage(Pomo.getText("Changed setting to").replace('${val}', Pomo.getText(val, {context:'Option'})));
  });
  $("#setting_post_sensitive").change(function() {
    if(this.checked) {
      val="true";
    }
    else {
      val="false";
    }
    localStorage.setItem("setting_post_sensitive",val);
    putMessage(Pomo.getText("Changed setting to").replace('${val}', Pomo.getText(val, {context:'Option'})));
  });
  $(document).on('change',".local_instance_wrap input[name='local_instance']", function(e) {
    if($(this).val()) {
      localStorage.setItem("setting_local_instance","https://"+$(this).val());
    }
    else {
      localStorage.setItem("setting_local_instance","default");
    }
    putMessage("Changed setting to "+$(this).val());
  });
  $(document).on('change',".search_filter_wrap input[name='search_filter']:checked", function(e) {
    localStorage.setItem("setting_search_filter", $(this).val());
    putMessage("Changed setting to "+$(this).val());
  });
  $("#setting_who_to_follow").change(function() {
    if(this.checked) {
      val="true";
    }
    else {
      val="false";
    }
    localStorage.setItem("setting_who_to_follow",val);
    putMessage(Pomo.getText("Changed setting to").replace('${val}', Pomo.getText(val, {context:'Option'})));
  })
}
else if(window.location.pathname == "/settings/profile") {
  $('#js-settings_nav_profile').toggleClass('view');
  $(function() {
    api.get("accounts/verify_credentials",function(AccountObj) {
      $(".display_name_wrap input[name='display_name']").val(AccountObj["display_name"]);
      if(AccountObj["source"]["note"].length != 0) {
        $(".about_me_wrap textarea[name='about_me']").val(AccountObj["source"]["note"]);
      }
      else {
        $(".about_me_wrap textarea[name='about_me']").val(AccountObj["note"]);
      }
      if(AccountObj["locked"] == true) {
        $("#setting_lock_account")[0].checked = true;
      }
      $("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
    });
  });
  $(document).on('change',".display_name_wrap input[name='display_name']", function(e) {
    $("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
    var val = $(this).val();
    api.patch("accounts/update_credentials",[{name:'display_name',data:val}],function() {
      $.removeCookie("session");
      $("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
      putMessage(Pomo.getText('Changed setting to').replace("${val}", val));
    });
  });
  $(document).on('change',".about_me_wrap textarea[name='about_me']", function(e) {
    $("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
    api.patch("accounts/update_credentials",[{name:'note',data:$(this).val()}],function() {
      $.removeCookie("session");
      $("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
      putMessage(Pomo.getText("Changed about me setting"));
    });
  });
  $("#setting_avatar").change(function() {
    if($('#setting_avatar').prop('files')[0]) {
      $("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
      var formdata = new FormData();
      formdata.append('avatar',$('#setting_avatar').prop('files')[0]);
      api.patch("accounts/update_credentials",formdata,function() {
        $.removeCookie("session");
        $("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
        putMessage(Pomo.getText("Uploaded new avatar"));
      })
    }
  });
  $("#setting_header").change(function() {
    if($('#setting_header').prop('files')[0]) {
      $("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
      var formdata = new FormData();
      formdata.append('header',$('#setting_header').prop('files')[0]);
      api.patch("accounts/update_credentials",formdata,function() {
        $.removeCookie("session");
        $("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
        putMessage(Pomo.getText("Uploaded new header"));
      })
    }
  });
  $("#setting_lock_account").change(function() {
    $("#savestate").removeClass("fa-check").addClass("fa-spin").addClass("fa-circle-o-notch");
    if(this.checked) {
      api.patch("accounts/update_credentials","locked=1",function() {
        $.removeCookie("session");
        $("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
        putMessage(Pomo.getText("Account locked"));
      });
    }
    else {
      api.patch("accounts/update_credentials","locked=0",function() {
        $.removeCookie("session");
        $("#savestate").removeClass("fa-spin").removeClass("fa-circle-o-notch").addClass("fa-check");
        putMessage(Pomo.getText("Account unlocked"));
      });
    }
  })
}
else if(window.location.pathname == "/settings/appearance") {
  $('#js-settings_nav_appearance').toggleClass('view');
  $(function() {
    $(".post_streaming_wrap input[name='post_streaming'][value='"+localStorage.getItem("setting_post_stream")+"']")[0].checked = true;
    if(localStorage.getItem('setting_link_previews') == "true") {
      $("#setting_link_previews")[0].checked = true;
    }
    if(localStorage.getItem('setting_autoplay_animated') == "true") {
      $("#setting_autoplay_animated")[0].checked = true;
    }
    if(localStorage.getItem('setting_desktop_notifications') == "true") {
      $("#setting_desktop_notifications")[0].checked = true;
      if (Notification.permission === 'default') {
        Notification.requestPermission(function(p) {
          if (p === 'denied') {
            $("#setting_desktop_notifications")[0].checked = false;
          }
        });
      }
      else if(Notification.permission == "denied") {
        $("#setting_desktop_notifications")[0].checked = false;
      }
    }
    if ( localStorage.getItem("image_size_tl") == null ) {
      $(".image_size_tl_wrap input[name='image_size_tl'][value='Normal']")[0].checked = true;
    }
    else {
      $(".image_size_tl_wrap input[name='image_size_tl'][value='"+localStorage.getItem("image_size_tl")+"']")[0].checked = true;
    }
  });
  $(document).on('change',".language_wrap select[name='language']", function(e) {
    $.cookie("lang",$(this).val(),{path:'/',expires: 3650});
    location.reload(true);
  });
  $(document).on('change',".post_streaming_wrap input[name='post_streaming']:checked", function(e) {
    localStorage.setItem("setting_post_stream", $(this).val());
    putMessage("Changed setting to "+$(this).val());
  });
  $("#setting_link_previews").change(function() {
    if(this.checked) {
      val="true";
    }
    else {
      val="false";
    }
    localStorage.setItem("setting_link_previews",val);
    putMessage(Pomo.getText("Changed setting to").replace('${val}', Pomo.getText(val, {context:'Option'})));
  });
  $("#setting_autoplay_animated").change(function() {
    if(this.checked) {
      val="true";
    }
    else {
      val="false";
    }
    localStorage.setItem("setting_autoplay_animated",val);
    putMessage(Pomo.getText("Changed setting to").replace('${val}', Pomo.getText(val, {context:'Option'})));
  });
  $("#setting_desktop_notifications").change(function() {
    if(this.checked) {
      val = "true";
    }
    else {
      val = "false";
    }
    var msg = Pomo.getText("Changed setting to").replace('${val}', Pomo.getText(val, {context:'Option'}) );
    if(this.checked) {
      if (Notification.permission === 'default') {
        Notification.requestPermission(function(p) {
          if (p === 'denied') {
            val = "false";
            $("#setting_desktop_notifications")[0].checked = false;
            msg = Pomo.getText("You didn't allow notifications");
          }
        });
      }
      else if(Notification.permission == "denied") {
        val = "false";
        $("#setting_desktop_notifications")[0].checked = false;
        msg = Pomo.getText("You didn't allow notifications");
      }
    }
    localStorage.setItem("setting_desktop_notifications",val);
    putMessage(msg);
  });
  $("#setting_show_replies").change(function() {
    if(this.checked) {
      val="true";
    }
    else {
      val="false";
    }
    localStorage.setItem("setting_show_replies",val);
    putMessage(Pomo.getText("Changed setting to").replace('${val}', Pomo.getText(val, {context:'Option'})));
  })
  $(document).on('change',".image_size_tl_wrap input[name='image_size_tl']:checked", function(e) {
    var val = $(this).val();
    localStorage.setItem("image_size_tl", val);
    putMessage(Pomo.getText("Changed setting to").replace('${val}', Pomo.getText(val, {context:'Option'})));
  });
}
