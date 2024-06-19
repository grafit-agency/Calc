document.addEventListener("DOMContentLoaded", function () {

    var HOURLY_PRICE_DEFAULT = 250;
    
    //design deafult values
    var DES_STYLE_GUIDE_DEFAULT = 8;
    var DES_HOURLY_DEFAULT = 70;
    var DES_UNIQUE_SECTION_DEFAULT = 4;
    var DES_COMPONENTS_DEFAULT = 5;
    var DES_LEGAL_DEFAULT = 1;
    var DES_COOKIES_DEFAULT = 1;

    //development default values
    var DEV_HOURLY_DEFAULT = 60;
    var DEV_STYLE_GUIDE_DEFAULT = 4;
    var DEV_UNIQUE_SECTION_DEFAULT = 2;
    var DEV_COMPONENTS_DEFAULT = 4;
    var DEV_LEGAL_DEFAULT = 1;
    var DEV_COOKIES_DEFAULT = 2;
    var DEV_ASSETS_COMPRESSION_DEFAULT = 2;
    var DEV_SEO_OPTIMISATION_DEFAULT = 2;
    var DEV_LANGUAGE_SWITCHER_DEFAULT = 3;

    //global variables
    var calcButton = document.querySelector('[calculate="true"]');
    var serviceSelect = document.getElementById('service');
    var multilanRadios = document.getElementById('multilan-radios');

    //helpful functions
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function checkCustomCheckbox(inputId) {
        var inputElement = document.getElementById(inputId);
        if (inputElement) {
            var siblingDiv = inputElement.previousElementSibling;
            if (siblingDiv && siblingDiv.tagName === "DIV") {
                siblingDiv.classList.add("w--redirected-checked");
            }
        }
        console.log('check custom');
    }


    function prepare() {

        //setting placeholders for inputs
        document.getElementById('hourly-price').placeholder = String(HOURLY_PRICE_DEFAULT) + "PLN/h"
        //for design
        document.getElementById('style-guide-des').placeholder = String(DES_STYLE_GUIDE_DEFAULT) + "h";
        document.getElementById('hourly-rate-des').placeholder = String(DES_HOURLY_DEFAULT) + "PLN/h";
        document.getElementById('unique-section-des').placeholder = String(DES_UNIQUE_SECTION_DEFAULT) + "h";
        document.getElementById('components-des').placeholder = String(DES_COMPONENTS_DEFAULT) + "h";
        document.getElementById('legal-des').placeholder = String(DES_LEGAL_DEFAULT) + "h";
        document.getElementById('cookies-des').placeholder = String(DES_COOKIES_DEFAULT) + "h";
        //for dev
        document.getElementById('style-guide-dev').placeholder = String(DEV_STYLE_GUIDE_DEFAULT) + "h";
        document.getElementById('hourly-rate-dev').placeholder = String(DEV_HOURLY_DEFAULT) + "PLN/h";
        document.getElementById('unique-section-dev').placeholder = String(DEV_UNIQUE_SECTION_DEFAULT) + "h";
        document.getElementById('components-dev').placeholder = String(DEV_COMPONENTS_DEFAULT) + "h";
        document.getElementById('legal-dev').placeholder = String(DEV_LEGAL_DEFAULT) + "h";
        document.getElementById('cookies-dev').placeholder = String(DEV_COOKIES_DEFAULT) + "h";
        document.getElementById('assets-compression-dev').placeholder = String(DEV_ASSETS_COMPRESSION_DEFAULT) + "h";
        document.getElementById('seo-dev').placeholder = String(DEV_SEO_OPTIMISATION_DEFAULT) + "h";
        document.getElementById('language-switcher-dev').placeholder = String(DEV_LANGUAGE_SWITCHER_DEFAULT) + "h";

        document.getElementById('multilan-checkbox').style.display = 'none';
        document.getElementById('default-values-des').style.display = 'none';
        document.getElementById('default-values-dev').style.display = 'none';
        document.getElementById('design-prices').style.display = 'none';
        document.getElementById('development-prices').style.display = 'none';
        document.getElementById('total-prices').style.display = 'none';
    }
    //gets the data from from the always visible inputs
    function getDefaultData() {
        var sectionsObj = document.getElementById('unique-sections');
        var componentsObj = document.getElementById('components');
        var multiLanObj = document.getElementById('multilan');
            return {
                numOfUniqueSections: sectionsObj.value,
                numOfComponents: componentsObj.value,
                relume: relumeObj.checked,
                multiLan: multiLanObj.checked
            };
    }

    //calculates the time of design
    function design(data) {
        var styleguide = document.getElementById('style-guide-des').value || DES_STYLE_GUIDE_DEFAULT;
        var unique_section = document.getElementById('unique-section-des').value || DES_UNIQUE_SECTION_DEFAULT;
        var components = document.getElementById('components-des').value || DES_COMPONENTS_DEFAULT;
        var legal = document.getElementById('legal-des').value || DES_LEGAL_DEFAULT;
        var cookies = document.getElementById('cookies-des').value || DES_COOKIES_DEFAULT;
        var design_time = (parseInt(styleguide) + data.numOfUniqueSections * parseInt(unique_section) + parseInt(components) * data.numOfComponents + parseInt(legal) + parseInt(cookies));
        return design_time
    }
    //calculates the time of development
    function development(data) {
        var styleguide = document.getElementById('style-guide-dev').value || DEV_STYLE_GUIDE_DEFAULT;
        var unique_section = document.getElementById('unique-section-dev').value || DEV_UNIQUE_SECTION_DEFAULT;
        var components = document.getElementById('components-dev').value || DEV_COMPONENTS_DEFAULT;
        var legal = document.getElementById('legal-dev').value || DEV_LEGAL_DEFAULT;
        var cookies = document.getElementById('cookies-dev').value || DEV_COOKIES_DEFAULT;
        var assets_compression = document.getElementById('assets-compression-dev').value || DEV_ASSETS_COMPRESSION_DEFAULT;
        var seo_optimisation = document.getElementById('seo-dev').value || DEV_SEO_OPTIMISATION_DEFAULT;
        var language_switcher = document.getElementById('language-switcher-dev').value || DEV_LANGUAGE_SWITCHER_DEFAULT;

        var devTime = (parseInt(styleguide) + data.numOfUniqueSections * parseInt(unique_section) + parseInt(components) * data.numOfComponents + parseInt(legal) + parseInt(cookies));
        var qaFix = devTime * 0.15;
        let devTimeTotal = devTime + qaFix;

        // Adjustments for multiple languages
        if (data.multiLan == true) {
            var languageSwitcher = language_switcher
            devTimeTotal += parseInt(languageSwitcher);
        }
        else {
            var languageSwitcher = 0;
        }

        // Adjustments for Relume conversion
        var relumeConversionTime = 0;
        if (data.relume == true) {
            // Adjusted values for Relume conversio
            styleguide = 2;
            unique_section = 0.5;
            components = 0.5;
            legal = 0.5;
            cookies = 0.5;

            relumeConversionTime = (styleguide + data.numOfUniqueSections * unique_section + components * data.numOfComponents + legal + cookies);
            devTimeTotal += relumeConversionTime;
        }
        return {
            devTimeTotal: devTimeTotal,
            devTime: devTime,
            qaFix: qaFix,
            relumeConversionTime: relumeConversionTime,
            languageSwitcher: data.multiLan === true ? parseInt(language_switcher) : 0,
        };

    }
    //decides whether to display the calculated value or error message
    function displayResultDesign(time) {
        if (isNaN(time)) {
            displayError();
        }
        else {
            var hourlyPrice = document.getElementById('hourly-price').value || HOURLY_PRICE_DEFAULT;
            var desHourly = document.getElementById('hourly-rate-des').value || DES_HOURLY_DEFAULT;
            var styleguide = document.getElementById('style-guide-des').value || DES_STYLE_GUIDE_DEFAULT;

            let totalPrice = time * hourlyPrice;
            let totalDesPrice = time * desHourly;

            //setting the design prices 
            document.getElementById('design-price').innerText = String(Math.ceil(time)) + "h";
            document.getElementById('styleguide-price').innerText = String(Math.ceil(styleguide)) + "h";
            document.getElementById('ux-ui-price').innerText = String(Math.ceil(time - styleguide)) + "h";

            //setting the total prices
            document.getElementById('total-price-hours').innerText = String(Math.ceil(time)) + "h";
            document.getElementById('total-price').innerText = formatPrice(Math.ceil(totalPrice)) + "PLN";
            document.getElementById('internalcost-price').innerText = formatPrice(String(Math.ceil(totalDesPrice))) + "PLN";
            document.getElementById('markup-price').innerText = formatPrice(String(Math.ceil(totalPrice - totalDesPrice))) + "PLN"; //in percents -> 100 * (totalPrice - totalDesPrice) / totalPrice)) + "%"

            //making the prices visible
            document.getElementById('price-show').style.display = 'none';
            document.getElementById('design-prices').style.display = 'flex';
            document.getElementById('development-prices').style.display = 'none';
            document.getElementById('total-prices').style.display = 'flex';
        }
    }
    function displayResultDevelopment(time) {
        if (isNaN(time.devTimeTotal)) {
            displayError();
        }
        else {
            var hourlyPrice = document.getElementById('hourly-price').value || HOURLY_PRICE_DEFAULT;
            var devHourly = document.getElementById('hourly-rate-dev').value || DEV_HOURLY_DEFAULT;
            var asset = document.getElementById('assets-compression-dev').value || DEV_ASSETS_COMPRESSION_DEFAULT;
            var seo = document.getElementById('seo-dev').value || DEV_SEO_OPTIMISATION_DEFAULT;

            //calculating the price
            let totalPrice = time.devTimeTotal * hourlyPrice;
            let totalDevPrice = time.devTimeTotal * devHourly;

            //setting the dev prives
            document.getElementById('webflowdevelopment-price').innerText = String(Math.ceil(time.devTimeTotal)) + "h";
            document.getElementById('development-price').innerText = String(Math.ceil(time.devTimeTotal - asset - seo - time.qaFix)) + "h";
            document.getElementById('assetcompression-price').innerText = String(Math.ceil(asset)) + "h";
            document.getElementById('basicseooprimization-price').innerText = String(Math.ceil(seo)) + "h";
            document.getElementById('qa-fixes-price').innerText = String(Math.ceil(time.qaFix)) + "h";

            //setting the total prices
            document.getElementById('total-price-hours').innerText = String(Math.ceil(time.devTimeTotal)) + "h"
            document.getElementById('total-price').innerText = formatPrice(Math.ceil(totalPrice)) + "PLN";
            document.getElementById('internalcost-price').innerText = formatPrice(String(Math.ceil(totalDevPrice))) + "PLN";
            document.getElementById('markup-price').innerText = String(Math.ceil(totalPrice - totalDevPrice)) + "PLN"; //in percents -> 100 * (totalPrice - totalDesPrice) / totalPrice)) + "%"

            //making the prices visible
            document.getElementById('price-show').style.display = 'none';
            document.getElementById('design-prices').style.display = 'none';
            document.getElementById('development-prices').style.display = 'flex';
            document.getElementById('total-prices').style.display = 'flex';
        }
    }

    function displayResultDevDes(time) {
        if (isNaN(time.devTimeTotal)) {
            displayError();
        }
        else {
            var priceShow = document.getElementById('price-show');
            var priceComponents = document.getElementById('price-components');
            var hourlyPrice = document.getElementById('hourly-price').value || HOURLY_PRICE_DEFAULT;
            var devHourly = document.getElementById('hourly-rate-dev').value || DEV_HOURLY_DEFAULT;
            var desHourly = document.getElementById('hourly-rate-des').value || DES_HOURLY_DEFAULT;
            var asset = document.getElementById('assets-compression-dev').value || DEV_ASSETS_COMPRESSION_DEFAULT;
            var seo = document.getElementById('seo-dev').value || DEV_SEO_OPTIMISATION_DEFAULT;
            var styleguide = document.getElementById('style-guide-des').value || DES_STYLE_GUIDE_DEFAULT;

            //calculating the result
            let totalPrice = Math.ceil(time.devTimeTotal + time.designTime) * hourlyPrice;
            let totalDevPrice = Math.ceil(time.devTimeTotal) * devHourly;
            let totalDesPrice = Math.ceil(time.designTime) * desHourly;

            //setting the design prices 
            document.getElementById('design-price').innerText = String(Math.ceil(time.designTime)) + "h";
            document.getElementById('styleguide-price').innerText = String(Math.ceil(styleguide)) + "h";
            document.getElementById('ux-ui-price').innerText = String(Math.ceil(time.designTime - styleguide)) + "h";

            //setting the dev prives
            document.getElementById('webflowdevelopment-price').innerText = String(Math.ceil(time.devTimeTotal)) + "h";
            document.getElementById('development-price').innerText = String(Math.ceil(time.devTimeTotal - asset - seo - time.qaFix)) + "h";
            document.getElementById('assetcompression-price').innerText = String(Math.ceil(asset)) + "h";
            document.getElementById('basicseooprimization-price').innerText = String(Math.ceil(seo)) + "h";
            document.getElementById('qa-fixes-price').innerText = String(Math.ceil(time.qaFix)) + "h";

            //setting the total prices
            document.getElementById('total-price-hours').innerText = String(Math.ceil(time.devTimeTotal + time.designTime)) + "h"
            document.getElementById('total-price').innerText = formatPrice(Math.ceil(totalPrice)) + "PLN";
            document.getElementById('internalcost-price').innerText = formatPrice(String(Math.ceil(totalDevPrice + totalDesPrice))) + "PLN";
            document.getElementById('markup-price').innerText = formatPrice(String(Math.ceil(totalPrice - totalDevPrice - totalDesPrice))) + "PLN";//String(Math.ceil(100 * (totalPrice - totalDevPrice - totalDesPrice) / totalPrice)) + "%"

            //making the prices visible
            document.getElementById('price-show').style.display = 'none';
            document.getElementById('design-prices').style.display = 'flex';
            document.getElementById('development-prices').style.display = 'flex';
            document.getElementById('total-prices').style.display = 'flex';
        }
    }

    //displays error and sets the style to error
    function displayError() {
        document.getElementById('price-show').innerText = "Something went wrong, please check inputs!";
    }
    //checks what service is choosen and changes the display of checkboxes
    function serviceCheck() {
        var relumeCheckbox = document.getElementById('relume-checkbox');
        var multiLanCheckbox = document.getElementById('multilan-checkbox');
        var serviceChosen = serviceSelect.value;
        var designDefaultvalues = document.getElementById('default-values-des');
        var developmentDefaultvalues = document.getElementById('default-values-dev');
        switch (serviceChosen) {
            case 'Development':
                relumeCheckbox.style.display = 'block';
                multiLanCheckbox.style.display = 'block';
                designDefaultvalues.style.display = 'none';
                developmentDefaultvalues.style.display = 'block';
                //checking the custom "no" checkboxes
                checkCustomCheckbox("relume-no");
                checkCustomCheckbox("multi-lan-no");
                break;
            case 'Design':
                relumeCheckbox.style.display = 'none';
                multiLanCheckbox.style.display = 'none';
                designDefaultvalues.style.display = 'block';
                developmentDefaultvalues.style.display = 'none';
                break;
            case 'Design and development':
                relumeCheckbox.style.display = 'block';
                multiLanCheckbox.style.display = 'block';
                designDefaultvalues.style.display = 'block';
                developmentDefaultvalues.style.display = 'block';
                checkCustomCheckbox("relume-no");
                checkCustomCheckbox("multi-lan-no");
                break;
            case '':
                relumeCheckbox.style.display = 'none';
                multiLanCheckbox.style.display = 'none';
                designDefaultvalues.style.display = 'none';
                developmentDefaultvalues.style.display = 'none';
                break;
        }
    }

    //main function running others
    function main() {
        switch (serviceSelect.value) {
            case 'Development':
                var time = development(getDefaultData());
                displayResultDevelopment(time);
                break;
            case 'Design':
                var time = design(getDefaultData());
                displayResultDesign(time);
                break;
            case 'Design and development':
                var time = development(getDefaultData());
                var designTime = design(getDefaultData());
                time.designTime = designTime;
                displayResultDevDes(time);
                break;
        }

    }
    function multiLanCheck(){
            //console.log(multilanRadios.value);
    }

    prepare();
    //Event listeners for bittons
    calcButton.addEventListener('click', function (e) {
        e.preventDefault();
        main();
    });
    serviceSelect.addEventListener('change', function (e) {
        e.preventDefault();
        serviceCheck();
    })
    multilanRadios.addEventListener('change',function(e){
        e.preventDefault();
        multiLanCheck();  
    })
});
