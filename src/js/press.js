$(document).ready(function() {
	const itemsPerPage = 10;

	function updatePaginationNumbers(currentPage) {
		const $activeContent = $('.press_contents.active');
		const $items = $activeContent.find('.press_contents_item');
		const totalItems = $items.length;
		const totalPages = Math.ceil(totalItems / itemsPerPage);

		// ページネーション番号のクリア
		$('.press_pagination_item').not('.press_pagination_prev, .press_pagination_next').remove();
		$('span:contains("･･･")').remove();

		if (currentPage <= 6) {
			for (let i = currentPage; i <= currentPage + 2 && i <= totalPages; i++) {
				$('.press_pagination_next').before(`<span class="press_pagination_item" data-page="${i}">${i}</span>`);
			}
			if (currentPage + 2 < totalPages) {
				$('.press_pagination_next').before('<span class="press_pagination_ellipsis">･･･</span>');
				$('.press_pagination_next').before(`<span class="press_pagination_item" data-page="${totalPages}">${totalPages}</span>`);
			}
		} else if (currentPage === 7) {
			for (let i = currentPage - 1; i <= totalPages; i++) {
				$('.press_pagination_next').before(`<span class="press_pagination_item" data-page="${i}">${i}</span>`);
			}
		} else if (currentPage === 8) {
			$('.press_pagination_prev').after(`<span class="press_pagination_item" data-page="1">1</span><span class="press_pagination_ellipsis">･･･</span>`);
			for (let i = currentPage; i <= totalPages; i++) {
				$('.press_pagination_next').before(`<span class="press_pagination_item" data-page="${i}">${i}</span>`);
			}
		} else {
			$('.press_pagination_next').before(`<span class="press_pagination_item" data-page="1">1</span>`);
			$('.press_pagination_next').before('<span class="press_pagination_ellipsis">･･･</span>');
			for (let i = currentPage - 1; i <= totalPages; i++) {
				$('.press_pagination_next').before(`<span class="press_pagination_item" data-page="${i}">${i}</span>`);
			}
		}

		$(`.press_pagination_item[data-page="${currentPage}"]`).addClass('active');
	}

	$('.press_tabs_item').on('click', function() {
		const target = $(this).data('target');
		
		$('.press_contents').removeClass('active');
		$('#' + target).addClass('active');

		$('.press_tabs_item').removeClass('active');
		$(this).addClass('active');
		
		updatePaginationNumbers(1);
	});

	$('.press_pagination').on('click', '.press_pagination_item:not(.press_pagination_prev, .press_pagination_next)', function() {
		const $activeContent = $('.press_contents.active');
		const $items = $activeContent.find('.press_contents_item');
		const pageNum = $(this).data('page');
		const startItem = (pageNum - 1) * itemsPerPage;
		const endItem = startItem + itemsPerPage;

		$items.hide().slice(startItem, endItem).show();
		$('.press_pagination_item.active').removeClass('active');
		$(this).addClass('active');

		updatePaginationNumbers(pageNum);
	});

   $('.press_pagination_prev').click(function() {
		let $activePage = $('.press_pagination_item.active');
		const currentPage = $activePage.data('page');
		
		if (currentPage === 8) {
			// ページ8の場合、ページ7の要素がないため、updatePaginationNumbersを直接呼び出す。
			const $activeContent = $('.press_contents.active');
			const $items = $activeContent.find('.press_contents_item');
			const pageNum = 7; // 8 - 1 = 7
			const startItem = (pageNum - 1) * itemsPerPage;
			const endItem = startItem + itemsPerPage;

			$items.hide().slice(startItem, endItem).show();
			$('.press_pagination_item.active').removeClass('active');

			updatePaginationNumbers(pageNum);
		} else if (currentPage > 1 && $('.press_pagination_item[data-page="'+ (currentPage - 1) +'"]').length === 0) {
			// 現在のページ番号が一番左にある場合の処理
			const $activeContent = $('.press_contents.active');
			const $items = $activeContent.find('.press_contents_item');
			const pageNum = currentPage - 1; // 1つ前のページに移動
			const startItem = (pageNum - 1) * itemsPerPage;
			const endItem = startItem + itemsPerPage;

			$items.hide().slice(startItem, endItem).show();
			$('.press_pagination_item.active').removeClass('active');

			updatePaginationNumbers(pageNum); 
		} else {
			let targetPageNum = $activePage.prevAll('.press_pagination_item').not('.press_pagination_prev').first().data('page');
			if (targetPageNum) {
				const targetPageItem = $('.press_pagination_item[data-page="' + targetPageNum + '"]');
				if (targetPageItem.length) {
					targetPageItem.trigger('click');
				}
			}
		}
	});




	$('.press_pagination_next').click(function() {
		let $activePage = $('.press_pagination_item.active');
		if ($activePage.next('.press_pagination_item').not('.press_pagination_next').length) {
			$activePage.next('.press_pagination_item').trigger('click');
		}
	});

	// 初期表示
	const $initialItems = $('.press_contents.active .press_contents_item');
	$initialItems.hide().slice(0, itemsPerPage).show();

	// ページネーションの初期セットアップ
	updatePaginationNumbers(1);
});
