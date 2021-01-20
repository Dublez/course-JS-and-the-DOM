document.body.addEventListener('keypress', function(){
    console.log('removing first child');
    document.querySelector('#contain-all').firstElementChild.remove();
});

document.addEventListener('DOMContentLoaded', function(){
    console.log('the DOM is ready to be interacted with');
})