// 1. දත්ත ගබඩා කරගැනීම (Variables)
var registeredUser = "r";
var registeredPass = "1";

// 2. පේජ් එක load වුණාම වැඩේ පටන් ගන්න
$(document).ready(function() {
    
    // Login Form එක submit කරන වෙලාව
    $('#loginForm').on('submit', function(e) {
        e.preventDefault(); // Page එක refresh වීම නවත්වයි
        
        // Input fields වල තියෙන දේවල් ලබාගැනීම
        var inputUser = $('#username').val();
        var inputPass = $('#password').val();

        // පරීක්ෂා කිරීම (Authentication)
        if (inputUser === registeredUser && inputPass === registeredPass) {
            loginSuccess();
        } else {
            alert("Username හෝ Password වැරදියි!");
        }
    });

    // Logout button එක click කරන වෙලාව
    $('#logoutBtn').on('click', function() {
        logoutUser();
    });

    // Sidebar එකේ navigation links click කරන වෙලාව
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        var sectionName = $(this).data('section'); // data-section අගය ලබාගැනීම
        changeSection(sectionName);
    });

});

// --- වැඩ කරන functions ටික මෙන්න ---

function loginSuccess() {
    $('#loginContainer').addClass('d-none'); // Login එක හංගන්න
    $('#mainApp').removeClass('d-none');    // Dashboard පෙන්වන්න
    changeSection('dashboard');             // මුලින්ම dashboard එකට යන්න
}

function logoutUser() {
    if (confirm("Logout වෙන්න ඕනද?")) {
        $('#mainApp').addClass('d-none');
        $('#loginContainer').removeClass('d-none');
        $('#loginForm')[0].reset(); // Form එක හිස් කරන්න
    }
}

function changeSection(sectionId) {
    // හැම section එකක්ම හංගන්න
    $('.content-section').addClass('d-none');
    
    // අපිට අවශ්‍ය section එක විතරක් පෙන්වන්න
    $('#' + sectionId + 'Section').removeClass('d-none');

    // Sidebar එකේ active පාට මාරු කරන්න
    $('.nav-link').removeClass('active');
    $('.nav-link[data-section="' + sectionId + '"]').addClass('active');
}