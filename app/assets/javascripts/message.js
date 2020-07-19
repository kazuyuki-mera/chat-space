$(function () {
  function buildHTML(message) {
    var imageUrl = message.image ? message.image : '';
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message__text">
                    ${message.content}
                  </div>
                  <div class="message__image">
                    <img class="" src="${imageUrl}">
                  </div>
                </div>`
    return html
  }

  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var url = $(this).attr('action');
    var formData = new FormData(this);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function (data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
    })
    .fail(function () {
      alert("メッセージ送信に失敗しました");
    });
  })

  var reloadMessages = function () {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: { id: last_message_id }
    })
      .done(function (messages) {
        if (messages.length !== 0) {
          //追加するHTMLの入れ物を作る
          var insertHTML = '';
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          $.each(messages, function (i, message) {
            insertHTML += buildHTML(message)
          });
          //メッセージが入ったHTMLに、入れ物ごと追加
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
        }
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 5000);
  }
});