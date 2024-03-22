
<?php
function projectCallingForInvestment()
{
    $args = array(
        'post_type'      => array('du-an-dau-tu'), // Các post type cần lấy dữ liệu
        'posts_per_page' => 3, // Số lượng bài đăng mỗi trang
        'paged'          => get_query_var('paged') ? get_query_var('paged') : 1, // Trang hiện tại
    );

    $query = new WP_Query($args);
    echo '<div class="search-box">
		<input placeholder="Nhập tên dự án" class="search-input"></input>
		<button class="search-submit" type="submit">
			<img src="/wp-content/uploads/2024/03/Group-71.svg" alt=""></img>
			<span>Tìm kiếm</span>
		</button>
	</div>';

    echo '<div class="card-container">';
    if ($query->have_posts()) :
        while ($query->have_posts()) : $query->the_post();
            // Lấy tên dự án
            $project_name = get_the_title();
            echo '<div class="card">';
            echo '<div class="card-content">';
            // Lấy ID của hình ảnh đặc trưng
            $thumbnail_id = get_post_thumbnail_id();
            if ($thumbnail_id) {
                // Lấy phần tử <img> từ ID hình ảnh
                $thumbnail = wp_get_attachment_image($thumbnail_id, 'full', false, array('class' => 'card-img-top'));
                echo $thumbnail;
            }

            echo '<span class="card-title">' . $project_name . '</span>';

            // Lấy các trường dữ liệu từ ACF
            $dia_diem = get_field('dia-diem');
            $tong_von_dau_tu = get_field('tong-von-dau-tu');
            $dien_tich = get_field('dien-tich');

            // Hiển thị các trường dữ liệu
            echo '<div class="card-info">';
            echo '<span><span style="font-weight: bold; font-style: italic">Địa điểm:</span> ' . $dia_diem . '</span>';
            echo '<span><span style="font-weight: bold; font-style: italic">Tổng vốn đầu tư:</span> ' . $tong_von_dau_tu . ' triệu USD </span>';
            echo '<span><span style="font-weight: bold; font-style: italic">Diện tích:</span> ' . $dien_tich . ' ha </span>';
            echo '</div>';
            echo '</div>'; // Kết thúc card-body
            echo '</div>'; // Kết thúc card

        endwhile;

        echo '</div>';

        // Hiển thị phân trang
        $total_pages = $query->max_num_pages; // Tổng số trang
        $current_page = max(1, get_query_var('paged')); // Trang hiện tại

        $range = 5; // Số lượng trang cần hiển thị
        $showitems = ($range * 2) + 1;

        if ($total_pages > 1) {
            echo '<div class="content-pagination">';
            for ($i = 1; $i <= $total_pages; $i++) {
                if ($i <= $range || $i > $total_pages - $range || ($i >= $current_page - floor($showitems / 2) && $i <= $current_page + floor($showitems / 2))) {
                    echo ($current_page == $i) ? '<div class="page-numbers current">' . $i . '</div>' : '<a class="page-numbers" href="' . esc_url(get_pagenum_link($i)) . '">' . $i . '</a>';
                }
            }
            echo '</div>';
        } else {
            echo 'Không có dự án được tìm thấy.';
        }
    endif;

    // Thêm script để xử lý tìm kiếm bằng AJAX
    echo '<script>
		jQuery(document).ready(function($) {
		$(".search-submit").click(function() {
			var keyword = $(".search-input").val();
			var data = {
				action: "search_projects",
				keyword: keyword
			};

			$.post(ajaxurl, data, function(response) {
				$(".card-container").html(response);
			});
		});
	});
</script>';



    wp_reset_postdata(); // Khôi phục dữ liệu bài đăng
}

// Add shortcode (shortcode, function name)
add_shortcode('projectCallingForInvestment', 'projectCallingForInvestment');

add_action('wp_ajax_search_projects', 'search_projects_callback');
add_action('wp_ajax_nopriv_search_projects', 'search_projects_callback');


function search_projects_callback()
{
    $keyword = $_POST['keyword'];

    $args = array(
        'post_type' => 'du-an-dau-tu',
        'posts_per_page' => 3,
        's'          => $keyword,
        'paged'          => get_query_var('paged') ? get_query_var('paged') : 1,
    );
    $query = new WP_Query($args);
    if ($query->have_posts()) {
 
        while ($query->have_posts()) {
            $query->the_post();
            // Lấy thông tin dự án
            $project_name = get_the_title();
            $thumbnail_id = get_post_thumbnail_id();
            $dia_diem = get_field('dia-diem');
            $tong_von_dau_tu = get_field('tong-von-dau-tu');
            $dien_tich = get_field('dien-tich');

            // Hiển thị card dự án
            echo '<div class="card">';
            echo '<div class="card-content">';
            if ($thumbnail_id) {
                $thumbnail = wp_get_attachment_image($thumbnail_id, 'full', false, array('class' => 'card-img-top'));
                echo $thumbnail;
            }
            echo '<span class="card-title">' . $project_name . '</span>';
            echo '<div class="card-info">';
            echo '<span><span style="font-weight: bold; font-style: italic">Địa điểm:</span> ' . $dia_diem . '</span>';
            echo '<span><span style="font-weight: bold; font-style: italic">Diện tích:</span> ' . $dien_tich . ' triệu USD </span>';
            echo '<span><span style="font-weight: bold; font-style: italic">Tổng vốn đầu tư:</span> ' . $tong_von_dau_tu . ' ha </span>';
            echo '</div>';
            echo '</div>'; // Kết thúc card-content
            echo '</div>'; // Kết thúc card
        }

        // Hiển thị phân trang
        $big = 999999999; // Số lớn để không bị trôi
        echo '<div class="pagination">';
        echo paginate_links(array(
            'base'    => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
            'format'  => '?paged=%#%',
            'current' => max(1, get_query_var('paged')),
            'total'   => $query->max_num_pages
        ));
        echo '</div>';
    } else {
        echo 'Không có dự án được tìm thấy.';
    }


    wp_reset_postdata();
    die();
}
?>