$(document).ready(function() {
    // Login Form එක Submit කරන වෙලාවට
    $('#loginForm').on('submit', function(e) {
        e.preventDefault(); // Page එක refresh වීම නවත්වනවා

        // User ඇතුළත් කරන දත්ත ලබාගැනීම
        const username = $('#username').val();
        const password = $('#password').val();

        // සරල පරීක්ෂාවක් (මෙතනට ඔයාට ඕන username/password දෙන්න)
        if (username === "a" && password === "a") {
            
            // 1. Login Card එක හංගන්න
            $('#loginContainer').addClass('d-none');
            
            // 2. Main App (Dashboard) එක පෙන්වන්න
            $('#mainApp').removeClass('d-none');
            
            // 3. දැනට ඉන්න User ගේ නම වෙනස් කරන්න
           
            console.log("Login Successful!");
        } else {
            // වැරදි නම් alert එකක් දෙන්න
            alert("Invalid UserName or Password. Please try again.");
        }
    });

    // Logout Button එක වැඩ කරන විදිහ
    $('#logoutBtn').on('click', function() {
        if(confirm("ඔබට පද්ධතියෙන් ඉවත් වීමට අවශ්‍යද?")) {
            // Dashboard හංගලා ආයෙත් Login එක පෙන්වන්න
            $('#mainApp').addClass('d-none');
            $('#loginContainer').removeClass('d-none');
            
            // Input fields හිස් කරන්න
            $('#loginForm')[0].reset();
        }
    });
});
