function loadSkeleton(){
    console.log($('#headerPlaceholder').load('../partials/header.html'));
    console.log($('#menubarPlaceholder').load('../partials/menubar.html'));
    console.log($('#footerPlaceholder').load('../partials/footer.html'));
}

loadSkeleton();
