// 应用 ID，用来识别应用
var APP_ID = '704UYMbXDunavhohFCcpNeWQ-gzGzoHsz';

// 应用 Key，用来校验权限（Web 端可以配置安全域名来保护数据安全）
var APP_KEY = 'Q7R3U6AhiNNTA5YT4fLUyQqJ';

// 初始化
AV.init({
    appId: APP_ID,
    appKey: APP_KEY,
});

var query_for_question = new AV.Query("Question");
query_for_question.get("58814076b123db0061d31975").then(function(question) {

    question_data = question.attributes;
    var source = $("#fill-in-question-template").html();
    var template = Handlebars.compile(source);
    var question_explanation_html = template(question_data);
    $('#question_explain_main_content').html(question_explanation_html);

    $("#hint").html('提示 (' + $("#hint_container > div").length + '/' + (question_data['hints'].length) + ")");


    $("#hint").click(function() {
        number_of_displayed_hint = $("#hint_container > div").length;
        if (number_of_displayed_hint < question_data['hints'].length) {
            hint_content = question_data['hints'][number_of_displayed_hint];
            $("#hint_container").append("<div class='hint_content col-md-8 col-xs-12'>" + hint_content + "</div>");
        }

        if (number_of_displayed_hint == question_data['hints'].length - 1) {
            $(this).prop("disabled", true);
        }

        $("#hint").html('提示 (' + $("#hint_container > div").length + '/' + (question_data['hints'].length) + ")");
    });

    $('#next-question').hide();
    $('#relevant-knowledge-components').hide();

    $(document).ready(function() {

        $("#submit").click(function() {
            submitAnswer();
        });

        $("#user_answer_input").keypress(function(e) {
            if (e.which == '13') {
                submitAnswer();
            }
        });

    });

    function submitAnswer() {
        user_answer = $("#user_answer_input").val();

        if (!user_answer) {
            $('#immediate-feedback').html("记得输入答案哦");
        } else if (question_data["answers"].indexOf(user_answer) > -1) {
            $('#immediate-feedback').html("答对了！");
            $('#next-question').show();
            // $('#relevant-knowledge-components').show();
            $('#submit').prop("disabled", true);
        } else if (question_data["possible_wrong_answers"]["wrong_answers"].indexOf(user_answer) > -1) {
            console.log("Check what's wrong.");
        } else {
            $('#immediate-feedback').html("然而，“" + user_answer + "”并不是正确答案……");
        }
    }

    $("#next-question").click(function() {
        console.log("test");
        window.location.href = 'index.html';
    });

});
