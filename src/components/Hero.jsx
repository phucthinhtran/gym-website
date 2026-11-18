
function Hero({ search, onSearchChange, onSearch, onBrowseExercises }) {

  const handleSearch = (e) => {
    e.preventDefault();

    const keyword = search.trim();

    onSearch(keyword);
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">

        {/* Thông tin thư viện */}
        <p className="hero-label">
          57 BÀI TẬP · 22 NHÓM CƠ · VIDEO MIỄN PHÍ
        </p>

        {/* Tiêu đề */}
        <h1>
          KHÁM PHÁ BÀI TẬP GYM.
          <br />
          <span>TẬP LUYỆN ĐÚNG CÁCH.</span>
        </h1>

        {/* Mô tả */}
        <p className="hero-description">
          Thư viện bài tập Gym giúp bạn hiểu rõ từng
          nhóm cơ, khám phá các bài tập và cải thiện
          kỹ thuật tập luyện.
        </p>

        {/* Thanh tìm kiếm */}
        <form
          className="hero-search"
          onSubmit={handleSearch}
          role="search"
        >
          <span className="search-icon">🔍</span>

          <input
            type="text"
            placeholder="Tìm bài tập: squat, ngực, tạ đơn..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Tìm kiếm bài tập"
          />

          <button type="submit">
            Tìm kiếm
          </button>
        </form>

        {/* Hai nút điều hướng */}
        <div className="hero-actions">
          <a href="#exercises" className="primary-button" onClick={onBrowseExercises}>
            Khám phá bài tập →
          </a>

          <a href="#muscles" className="secondary-button">
            Bản đồ nhóm cơ
          </a>
        </div>

      </div>
    </section>
  );
}

export default Hero;
