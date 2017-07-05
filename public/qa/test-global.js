suite('Global Tests', function(){
    test('page has a valid title', function(){
        assert(document.title && docutment.title.match(\/S\) && 
            document.title.toUpperCase() !== 'TODO');
    });
});