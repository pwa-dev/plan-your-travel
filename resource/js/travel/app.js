if ('serviceWorker' in navigator && 'PushManager' in window) {
	console.log('Service Worker and Push is supported');
	
	navigator.serviceWorker.register('travel_sw.js').then(function(registration) {
	    // Registration was successful
	}).catch(function(err) {
		// registration failed :(
		console.log('ServiceWorker registration failed: ', err);
	});
}

$( document ).ready(function() {
	
	// navigation click actions 
    $('.scroll-link').on('click', function(event){
        event.preventDefault();
        var sectionID = $(this).attr("data-id");
        scrollToID('#' + sectionID, 750);
    });
    
    // scroll to top action
    $('.scroll-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop:0}, 'slow');         
    });
    
    // mobile nav toggle
    $('#nav-toggle').on('click', function (event) {
        event.preventDefault();
        $('#main-nav').toggleClass("open");
    });
    
    $('#createPeriod').daterangepicker({
		minDate : moment()
	});
    
	$('#editPeriod').daterangepicker();
    
    $(window).on("scroll", function() {
        if($(window).scrollTop() > 100) {
            $(".header").addClass("active");
        } else {
           $(".header").removeClass("active");
        }
    });
    
	$('#createBtn').click(function(){
		$('#createTravel').submit();
	});
	
	$('#createPeriod').change(function(){
		var fromDt = $('#createPeriod').data('daterangepicker').startDate.format('YYYYMMDD');
		var toDt = $('#createPeriod').data('daterangepicker').endDate.format('YYYYMMDD');
		$('#createStartDate').val(fromDt);
		$('#createEndDate').val(toDt);
	});
	
	$('#logoutBtn').click(function(){
		location.href = "/service/logout";
	});
	
	$('#saveBtn').click(function(){
		$('#editTravel').submit();
	});
	
	$('#editPeriod').change(function(){
		var fromDt = $('#editPeriod').data('daterangepicker').startDate.format('YYYYMMDD');
		var toDt = $('#editPeriod').data('daterangepicker').endDate.format('YYYYMMDD');
		$('#editStartDate').val(fromDt);
		$('#editEndDate').val(toDt);
	});
	
	$("#editScheBtn").click(function(e){
		$("#editScheBtnDiv").hide();
		$("#saveScheBtnDiv").show();
		$(".add-sche-btn").hide();
		$(".sche-item i").show();
		
		$(".sche-item-list").sortable("enable");
	});
	$("#cancelScheBtn").click(function(e){
		$("#editScheBtnDiv").show();
		$("#saveScheBtnDiv").hide();
		$(".add-sche-btn").show();
		$(".sche-item i").hide();
		
		$(".sche-item-list").sortable("disable");
	});
	
	$(".sche-item-list").sortable({
		items: "> li",
		handle: ".sche-move-btn",
		connectWith: ".sche-item-list"
	});
	$( ".sche-item-list" ).sortable( "option", "scroll", false );
	$(".sche-item-list").sortable("disable");
	$(".sche-item-list").disableSelection();
	$(".sche-date").disableSelection();
	
	$("#saveScheBtnDiv").hide();
	$("#editScheBtnDiv").show();
	
	$(".sche-delete-btn").click(function(e){
		$(this).parent("li").addClass("deleted");
	});
	$(".sche-item").on("transitionend", function(){
		$(this).hide();
		$(this).attr("data-delete-flag", "Y");
	});
});

//scroll function
function scrollToID(id, speed){
    var offSet = 50;
    var targetOffset = $(id).offset().top - offSet;
    var mainNav = $('#main-nav');
    $('html,body').animate({scrollTop:targetOffset}, speed);
    if (mainNav.hasClass("open")) {
        mainNav.css("height", "1px").removeClass("in").addClass("collapse");
        mainNav.removeClass("open");
    }
}

function openSidebar(target){
	$('.sidebar').toggleClass('is-open'); 
	$('.nav').toggleClass('is-open'); 
    $('#'+target).show();
    
    switch(target){
    	case "createTravel" :
    		// 인풋값 초기화 필요할까..
    		break;
    }
}

function cancelSidebar(target){
	$('.sidebar').toggleClass('is-open'); 
	$('.nav').toggleClass('is-open');
	$('#'+target).hide();	
}
function addSchedule(travelNo, travelDate){
	$("#addScheTravelNo").val(travelNo);
	$("#addScheTravelDate").val(travelDate);
	$("#scheTravelDate").val(travelDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3'));
	$("#addSchePlace").val("");
	$("#addScheMemo").val("");
	openSidebar("addSchedule");
}
