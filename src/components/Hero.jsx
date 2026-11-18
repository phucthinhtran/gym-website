
import { useState } from "react";

function Hero() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const keyword = search.trim();

    if (!keyword) return;

    // Tạm thời kiểm tra từ khóa tìm kiếm
    alert(`Bạn đang tìm kiếm: ${keyword}`);
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
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Tìm kiếm bài tập"
          />

          <button type="submit">
            Tìm kiếm
          </button>
        </form>

        {/* Hai nút điều hướng */}
        <div className="hero-actions">
          <a href="#exercises" className="primary-button">
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
