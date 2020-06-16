$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="mainchat__mid--msgbox">
          <div class="mainchat__mid--msgbox--namendates">
            <div class="mainchat__mid--msgbox--namendates--name">
              ${message.name}
            </div>
            <div class="mainchat__mid--msgbox--namendates--dates">
              ${message.created_at}
            </div>
          </div>
          <div class="mainchat__mid--msgbox--msg">
            <p class="message__content">
              ${message.text}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="mainchat__mid--msgbox">
        <div class="mainchat__mid--msgbox--namendates">
          <div class="mainchat__mid--msgbox--namendates--name">
            ${message.name}
          </div>
          <div class="mainchat__mid--msgbox--namendates--dates">
            ${message.created_at}
          </div>
        </div>
        <div class="mainchat__mid--msgbox--msg">
          <p class="message__content">
            ${message.text}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.mainchat__mid').append(html);
      $('form')[0].reset();
      $('.mainchat__mid').animate({ scrollTop: $('.mainchat__mid')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function() {
      $('.send').prop('disabled', '');
    })
  });
});