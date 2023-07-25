document.addEventListener("DOMContentLoaded", function() {
    // Code for the home screen and to-do list
    const homeScreen = document.getElementById("homeScreen");
    const calculatorButton = document.getElementById("calculatorButton");
    const gradientButton = document.getElementById("gradientButton");
    const todoButton = document.getElementById("todoButton");
    const calculator = document.getElementById("calculator");
    const todoList = document.getElementById("todoList");
    const gradient = document.getElementById("gradient");

    // Show Calculator
    calculatorButton.addEventListener("click", function() {
        homeScreen.classList.add("hidden");
        returnButton.classList.remove("hidden");
        calculator.classList.remove("hidden");
    });

    // Show To-Do List
    todoButton.addEventListener("click", function() {
        homeScreen.classList.add("hidden");
        returnButton.classList.remove("hidden");
        todoList.classList.remove("hidden");
        console.log('to do clicked')
    });

    // Show Background Gradient Creator
    gradientButton.addEventListener("click", function() {
        homeScreen.classList.add("hidden");
        returnButton.classList.remove("hidden");
        gradient.classList.remove("hidden");
        document.body.classList.add("showGradient");
        console.log('gradient clicked')
    });


    // Show Home and Hide App
    returnButton.addEventListener("click", function() {
        homeScreen.classList.remove("hidden");
        returnButton.classList.add("hidden");
        calculator.classList.add("hidden");
        todoList.classList.add("hidden");
        gradient.classList.add("hidden");
        document.body.classList.remove("showGradient")
    });

});
