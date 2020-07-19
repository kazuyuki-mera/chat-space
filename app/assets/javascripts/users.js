$(function () {
  // インクリメンタルサーチ該当ユーザーhtml生成(追加)
  function addUser(user) {
    let html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `;
    $("#user-search-result").append(html);
  }

  // インクリメンタルサーチ該当なしhtml生成
  function addNoUser() {
    let html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>
                `;
    $("#user-search-result").append(html);
  }

  // 追加メンバーhtml生成（削除）
  function addDeleteUser(name, id) {
    let html = `
                <div class="chat-group-user clearfix" id="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
                </div>
                `;
    $(".js-add-user").append(html);
  }

  // 
  function addMember(userId) {
    let html = `
                <input value="${userId}" name="group[user_ids][]" type="hidden" class="add-user-id" id="group_user_ids_${userId}" />
                `;
    $(`#${userId}`).append(html);
  }

  // インクリメンタルサーチ
  $('#user-search-field').on('keyup', function () {
    let input = $(this).val();
    let addUserIds = [""]; // 追加チャットメンバーのIDのリスト
    $(".add-user-id").each(function () {
      addUserIds.push($(this).val());
    });

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {
        keyword: input,
        array: addUserIds
      },
      dataType: 'json'
    })
      .done(function (users) {
        // 検索結果一覧をリセットする
        $('#user-search-result').empty();

        if (users.length !== 0) {
          users.forEach(function (user) {
            addUser(user);
          });
        } else if (input.length === 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function () {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });

  // インクリメンタルサーチ該当ユーザー追加ボタン押下
  $(document).on("click", ".chat-group-user__btn--add", function () {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });

  // 追加メンバー削除ボタン押下
  $(document).on("click", ".chat-group-user__btn--remove", function () {
    $(this).parent().remove();
  });
});