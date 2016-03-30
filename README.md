## SEO/SEM Organic Capture (javascript.org.js)

A javascript file that when attched to a landing page which posts to the Enhanced Buyflow, will capture Search Engine Refferel with Organic terms, Except in the case of google which will capture "google(organic)". 

#### What does it do?

	1. Capture SEO referrals and place into the lead DB.
	2. Post data to lead qual.
	3. Create a user cookie with keywords.

#### Implement:

	1. attach the script to the head tag of each landing page: 
		a. <script type="text/javascript" src="dir/version/assets/js/javascript.org.js"></script>
		b. this is not dependent upon jquery or similar framework.
        
	2. add script call to ajax data array in qualify.js:
		a. getkeywords() added to array at leadOptional, example:
        
        $.ajax({
		url:strRoot+'lcs.php',
		type:'POST',
		async:false,
		data:{
			'leadSourceID':form.txtPartnerID.value,
			'sitePromoID':form.PromoID.value,
			'useOTS':false,
			'leadAddress1':form.txtHomeStreetAddress1.value,
			'leadAddress2':form.txtHomeStreetAddress2.value,
			'leadZip':form.txtHomeZip.value,
			'siteAttributionTrackingURL':form.DigitalLandingUrl.value,
			'sitePhoneNumber':form.strPromo1.value,
			'urlParams':window.location.search,
			'referringSite':window.location.host,
			'leadStep':'qual',
	'leadOptional':getkeywords()
		},
