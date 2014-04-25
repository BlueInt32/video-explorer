var expect = require("chai").expect;
var pathHelper = require("../PathHelper.js");

describe("[Path Helper]", function(){

    describe('[Specifications]', function()
    {
        it("should have a getBasePath function", function()
        {
            expect(pathHelper).to.have.a.property("getBasePath");
        });

        it("should have a setBasePath function", function()
        {
            expect(pathHelper).to.have.a.property("setBasePath");
        });
        it("should have a toAbsolute function", function()
        {
            expect(pathHelper).to.have.a.property("toAbsolute");
        });

        it("should have a toRelative function", function()
        {
            expect(pathHelper).to.have.a.property("toRelative");
        });

        it("should have a trimSlashes function", function()
        {
            expect(pathHelper).to.have.a.property("trimSlashes");
        });

        it('should have a urlEncode function', function()
        {
            expect(pathHelper).to.have.a.property("urlEncode");
        });

        it('should have a urlDecode function', function()
        {
            expect(pathHelper).to.have.a.property("urlDecode");
        });

        it('should have a processUpFolder function', function()
        {
            expect(pathHelper).to.have.a.property("processUpFolder");
        });

        it('should have a combine function', function()
        {
            expect(pathHelper).to.have.a.property("combine");
        });
        it('should have a extractFileName function', function()
        {
             expect(pathHelper).to.have.a.property("extractFileName");
        });
    });
    describe("[Initialisation]", function()
    {

        it('should have empty getBasePath at creation', function()
        {
            expect(pathHelper.getBasePath()).equal("");
        });

        it('should be initialized before any conversion usage', function()
        {
            expect(pathHelper.toAbsolute).to.throw('Not initialized !');
            expect(pathHelper.toRelative).to.throw('Not initialized !');
        });

        it('should initialize basePath correctly', function()
        {
            pathHelper.setBasePath("///e:/salut/coucou/test//");
            expect(pathHelper.getBasePath()).equal("e:/salut/coucou/test");
        });
    });

    describe("[Basic treatment]", function()
    {
        it('should trim slashes correctly', function()
        {
            var path = "//something//";
            expect(pathHelper.trimSlashes(path)).to.equal("something");
        });


        it('should urlEncode properly', function()
        {
            expect(pathHelper.urlEncode("chemin # à la noix / mais bon ( parfois /")).equal("chemin%20%23%20%C3%A0%20la%20noix%20%2F%20mais%20bon%20(%20parfois%20%2F");
        });

        it('should urlDecode properly', function()
        {
            expect(pathHelper.urlDecode("chemin%20%23%20%C3%A0%20la%20noix%20%2F%20mais%20bon%20(%20parfois%20%2F")).equal("chemin # à la noix / mais bon ( parfois /");
        });
    });

    describe('[Kinda evoluted functions]', function()
    {
        it('toAbsolute should return correct abolutePath', function()
        {
            var relativePath = "//rel/ative/path/../";
            pathHelper.setBasePath("/e:/git/path with spaces/and things/");
            expect(pathHelper.toAbsolute(relativePath)).equal("e:/git/path with spaces/and things/rel/ative");
            expect(pathHelper.toAbsolute("")).equal("e:/git/path with spaces/and things");
        });

        it('toRelative should return an error if absolute input does not correspond to basePath', function()
        {
            pathHelper.setBasePath('e:/basePath/coucou');
            expect(function() { pathHelper.toRelative('d:/basePath/coucou')}).to.throw('Start of the provided absolute path not matching the basePath !');

        });
        it('toRelative should NOT return an error if absolute input corresponds to base path even with untrimed slashes', function()
        {
            pathHelper.setBasePath('e:/basePath/coucou');
            expect(function() { pathHelper.toRelative('//e:/basePath/coucou/')}).to.not.throw();
        });

        it('toRelative should return correct relative path', function()
        {
            pathHelper.setBasePath('//e:/basePath/coucou//');
            expect(pathHelper.toRelative('//e:/basePath/coucou/relative/salut/haha/../')).equal("relative/salut");
        });

        it('should process ".." (up folder) path properly', function()
        {
            var inputPath = "salut/ca/va/../";
            expect(pathHelper.processUpFolder(inputPath)).equal("salut/ca");
        });

        it('should combine paths correctly', function()
        {
            expect(pathHelper.combine("//e:/salut//", "/relative/coucou/")).equal("e:/salut/relative/coucou");
        });

        it('should return correct extractFileName results', function()
        {
            expect(pathHelper.extractFileName('//e:paht/to/salut/ # salut \' copain .mpx')).equal(' # salut \' copain .mpx');
        });

    });

    //describe("

});
