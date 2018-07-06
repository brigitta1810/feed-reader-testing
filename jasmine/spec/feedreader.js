/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* A suite defining the RSS and the allFeeds variable. 
    */
    describe('RSS Feeds', function() {
        /* Checking the allFeeds variable: we expect that it has been defined and it has content. 
         *In order for the app to work as we want it to work, this test needs to be passed.
         */
        

        /* The allFeeds object contains several feeds, many of which are articles about Udacity alumni's success. 
         * The purpose of the Feed Reader is to allow users to click on a title and read the whole story/article on Udacity's blog. 
         * Therefore, it is vital that every single feed in the app has an URL defined, and that URL is not empty.
         * In order to check this, we need to loop through the allFeeds object to make sure, every feed has a URL defined and the URL is not empty.
         * Then, we use the expect keyword, which takes the parameter "feed.url" (meaning the target of our test is the Feed's URL). 
         * Then we use the "toBeDefined" method to check if it has been defined.
         * In order to check that the URL is not empty, we take the feed's URL again as an argument, and focus on its lenght property. 
         * We expect it not to be 0 (i.e. empty). If it is 0 (empty), then we have to edit the source code, add content, and try to pass the test again.
         */

        it ('each feed has URL', function() {
            allFeeds.forEach(function(feed){
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
            });     
        });
         

         /* In order to see the text of the feed (on which we can click to read the article), it is vital that the text (article headline)
          * shows up in each feed. 
          * Therefore, it needs to be checked. In order to check that each feed has a name defined and is not empty, we have to loop through 
          * the allFeeds object again.
          * Then, we need to test if the name is defined, and it has a content. To do so, we use the expect keyword, add allFeeds as a parameter, 
          * and then use the "toBedefined" method.
          * To chek that the name is not empty, we have to check weather its lenght is not 0, i.e. empty. 
          */
        it('each feed has name', function() {
            allFeeds.forEach(function(feed){
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
    
        });     

        });




    
    /* A new test suite, called "Menu" is defined here*/
    describe('The menu', function() {

           /* The feed reader has a hamburger icon, where we can click to see the menu. 
            * The menu should be therefore, be hidden, unless we click on the hamburger icon
            * To test wheather the menu element is hidden, when we open the Feed Reader, and not interact with the page, we need to focus 
            * on the HTML pages body element and the hamburger icon (called menuIcon). 
            * Two variables are made which store these two elements. 
            * We expect that in the HTML file, the body tag has a class called 'menu-hidden'. If it is true, the test is passed, and the menu 
            * is not showing in default mode. 
            */

        it('menu is hidden as a default', function() {
            const body = document.body;
            const menuIcon = document.querySelector(".menu-icon-link");
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


        
         /* The menu-icon-link is stored in the hamburger variable. A click event is added to the variable, after which we expect the 'menu-hidden'
          * to be false. In other words, the menu should show. 
          * Then, a second click event is added to the variable (hamburger icon), after which we expect the menu to be hidden again. 
          * The 'menu-hidden' class in the CSS file makes the menu hidden in default mode, and therefore, we can use the 'hasClass' method, to check whether 
          * it is false (not hidden), or true (hidden).
          */

        it('menu is visible when hamburger clicked', function() {
            const hamburger = $('.menu-icon-link');
            hamburger.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            hamburger.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

          
    /* The test suite "Initial Entries" is created*/

    describe('Initial Entries', function() {

        /* When the Feed Reader is loaded, there should be at least one .entry element within the .feed.
         * Since the loadFeed is asynchronous, first of all, we need to use two of Jasmine's functions: the beforeEach and done() functions.
         * Then, using querySelector, we need to focus on the length of the .entry class. And we need to check it is greater than 0, 
         * in other words, at least one .entry is there within the .feed container when it is loaded. 
         */ 
       

        beforeEach(function(done) {
            loadFeed(0, function() {
            done();
            });
        });
    

        
        it("element(s) show up when the loadFeed function loads", function(done) {
            var numberFeed = document.querySelector(".feed").getElementsByClassName("entry").length;
            expect(numberFeed).toBeGreaterThan(0);
            done();
        });
    });

    

    /* "New Feed Selection" test suite is created*/

    describe('New Feed Selection', function() {
        var olderNews;
        var recentNews;

        /* The following test ensures that the Feed Reader's content is changed, if a new feed is loaded. 
         * Since the loadFeed function is asynchronous, we need to apply Jasmine's beforeEach and done() functions again. Then we check wether the olderNews
         * variable is the same as the .feed class. The test should evaluate to 'true' in order to pass. 
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
            olderNews = $('.feed').html();
            loadFeed(1, done);
            });
        });

        it('news feed different when reloaded', function() {
            expect($('.feed').html()).not.toEqual(olderNews);
            });
        });  
    });
        
});