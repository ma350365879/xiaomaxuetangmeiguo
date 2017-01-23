// 应用 ID，用来识别应用
var APP_ID = '704UYMbXDunavhohFCcpNeWQ-gzGzoHsz';

// 应用 Key，用来校验权限（Web 端可以配置安全域名来保护数据安全）
var APP_KEY = 'Q7R3U6AhiNNTA5YT4fLUyQqJ';

// 初始化
AV.init({
    appId: APP_ID,
    appKey: APP_KEY,
});

var query_for_question = new AV.Query("New_Question");
query_for_question.get("588577198d6d81006cea60a2").then(function(question) { //588534761b69e600591dfee3， 58854bed2f301e006986adb3

    question_data = question.attributes;
    console.log(question_data);
    var source = $("#fill-in-question-template").html();
    var template = Handlebars.compile(source);
    var question_explanation_html = template(question_data);
    $('#question_explain_main_content').html(question_explanation_html);
    $("#question_content").html(question_data['content'])

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "question_explain_main_content"]);
    $("#hint").html('提示 (' + $("#hint_container > div").length + '/' + (question_data['hints'].length) + ")");


    $("#hint").click(function() {
        number_of_displayed_hint = $("#hint_container > div").length;
        if (number_of_displayed_hint < question_data['hints'].length) {
            hint_content = question_data['hints'][number_of_displayed_hint];
            $("#hint_container").append("<div class='hint_content col-md-8 col-xs-12'>" + hint_content + "</div>");
            // MathJax.Hub.Queue(["Typeset", MathJax.Hub, "hint_container"]);
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
        var user_answer = $("#user_answer_input").val();
        var correct_answer_position = question_data["possible_answers"]["correct_answers"].indexOf(user_answer) 
        var wrong_answer_position = question_data["possible_wrong_answers"]["wrong_answers"].indexOf(user_answer);
        if (!user_answer) {
            $('#immediate-feedback').html("记得输入答案哦");
        } else if ( correct_answer_position > -1) {
            $('#immediate-feedback').html("答对了！");
            // $('#relevant-knowledge-components').show();
            if (question_data["possible_wrong_answers"]['hint_for_wrong_answers'][wrong_answer_position]){
                $("#correct_answer_feedback_container").append("<div class='answer_feedback_content bg-info col-md-8 col-xs-12'>" + question_data["possible_wrong_answers"]['hint_for_wrong_answers'][wrong_answer_position] + "</div>");
                question_data["possible_answers"]["correct_answers"].splice(wrong_answer_position,1);
                question_data["possible_answers"]['feedback_for_correct_answers'].splice(wrong_answer_position,1);
            }
            $('#submit').prop("disabled", true);
            $('#next-question').show();
        } else if ( wrong_answer_position > -1) {
            if (question_data["possible_wrong_answers"]['hint_for_wrong_answers'][wrong_answer_position]){
                $("#wrong_answer_feedback_container").append("<div class='answer_feedback_content bg-info col-md-8 col-xs-12'>" + question_data["possible_wrong_answers"]['hint_for_wrong_answers'][wrong_answer_position] + "</div>");
                question_data["possible_wrong_answers"]["wrong_answers"].splice(wrong_answer_position,1);
                question_data["possible_wrong_answers"]['hint_for_wrong_answers'].splice(wrong_answer_position,1);
            }
            $('#immediate-feedback').html("然而，“" + user_answer + "”并不是正确答案……");
        } else {
            $('#immediate-feedback').html("然而，“" + user_answer + "”并不是正确答案……");
        }
    }

    $("#next-question").click(function() {
        console.log("test");
        window.location.href = 'index.html';
    });

});


