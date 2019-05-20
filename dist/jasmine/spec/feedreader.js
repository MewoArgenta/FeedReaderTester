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
    /*This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* this tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('array allFeeds is defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* this test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it ('allFeeds objets have url defined', function() {
            allFeeds.forEach(function (element){
                expect(element.url).toBeDefined();
                expect(element.url).not.toBe('')
            })
        })


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it ('allFeeds objects have name defined', function() {
            allFeeds.forEach(function (element){
                expect(element.name).toBeDefined();
                expect(element.name).not.toBe('')
            })
        })

    });




    /* This suite contains the tests who make sure "The menu" is hidden and displayed when it should */
    describe('The menu', function() {

        /* This test ensures the menu element is
         * hidden by default.
         */
         let menu = $("body");

         it ('menu element is hidden', function() {
             expect(menu.hasClass('menu-hidden')).toBe(true)
         })



         /* This test ensures that the menu changes
          * visibility when the menu icon is clicked and hides when clicked again.
          */
        const menuIcon = document.getElementsByClassName('icon-list')[0];

        it ('menu display toggles after clicking menu-icon', function() {
            menuIcon.click();
            expect(menu.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(menu.hasClass('menu-hidden')).toBe(true);
        })
    });


    /*This suite contains a test checking the "Initial Entries" */
    describe ('Initial Entries', function() {

        // loadFeed is asynchonous so the expect shouldn't start before the callback is done.
        beforeEach(function(done) {
            loadFeed(0, done);
        });



        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('loadFeed results in at least one element', function(done){

            const feed = document.getElementsByClassName('feed')[0];
            const initialEntries = feed.getElementsByClassName('entry');
            expect(initialEntries.length).toBeGreaterThan(0);
            done();
        })
    })



    /* This suite checks if we have a difference between different elements from AllFeeds */
   describe ('New Feed Selection', function() {

    /* This test ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */

        it ('when a new feed is loaded, the content changes', async function(done) {

            let feedBefore;
            let feedAfter;

            (function() {
                loadFeed(0, firstLoadDone);
                function firstLoadDone() {
                    feedBefore = document.getElementsByClassName('entry-link')[0].getElementsByTagName('h2')[0];
                    loadFeed(1, secondLoadDone)
                    function secondLoadDone() {
                        feedAfter = document.getElementsByClassName('entry-link')[0].getElementsByTagName('h2')[0];
                        finished();
                    }
                }
            })();

            function finished() {
                expect(feedBefore !== feedAfter).toBe(true);
                done()
            }
        })

    })

}());
