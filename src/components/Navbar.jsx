
function Navbar() {
  return (
    <header className="navbar">
      <a href="#home" className="logo">
        GYM<span>ATLAS</span>
      </a>

      <nav className="nav-links">
        <a href="#home">Trang chủ</a>
        <a href="#muscles">Nhóm cơ</a>
        <a href="#exercises">Bài tập</a>
        <a href="#schedule">Lịch tập</a>
      </nav>

      <a href="#exercises" className="nav-button">
        Khám phá ngay
      </a>
    </header>
  );
}

export default Navbar;
