var categories = [];
var nodiac = { 'á': 'a', 'č': 'c', 'ď': 'd', 'é': 'e', 'ě': 'e', 'í': 'i', 'ň': 'n', 'ó': 'o', 'ř': 'r', 'š': 's', 'ť': 't', 'ú': 'u', 'ů': 'u', 'ý': 'y', 'ž': 'z' };

$( document ).ready(function() {
    init();
});

function init() {
    $.each(data, function( i, item ) {
        item.cSlug = make_url(item.c);
        item.nSlug = make_url(item.n);
    });

    getCategories();
}

function getCategories() {
    var names = [];
    $.each(data, function( i, item ) {
      if($.inArray( item.c, names ) == -1) {
        names.push(item.c);
        categories.push({
            name: item.c,
            slug: item.cSlug
        });
      }
    });
}

function getCategoryName(slug) {
    var name = null;
    var result = $.grep(categories, function( item, i ) {
        return ( item.slug == slug );
    })
    if(result.length == 1) name = result[0].name;

    return name;
}

function getProductsInCategory(slug) {
    var products = $.grep(data, function( item, i ) {
      return ( item.cSlug == slug );
    })
    return products;
}

function getProductBySlug(slug) {
    var product = null;
    var result = $.grep(data, function( item, i ) {
        return ( item.nSlug == slug );
    })
    if(result.length == 1) product = result[0];

    return product;
}

/** Vytvoření přátelského URL
* @param string řetězec, ze kterého se má vytvořit URL
* @return string řetězec obsahující pouze čísla, znaky bez diakritiky, podtržítko a pomlčku
* @copyright Jakub Vrána, https://php.vrana.cz/
*/
function make_url(s) {
    s = s.toLowerCase();
    var s2 = '';
    for (var i=0; i < s.length; i++) {
        s2 += (typeof nodiac[s.charAt(i)] != 'undefined' ? nodiac[s.charAt(i)] : s.charAt(i));
    }
    return s2.replace(/[^a-z0-9_]+/g, '-').replace(/^-|-$/g, '');
}