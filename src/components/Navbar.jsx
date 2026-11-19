
function Navbar({ onBrowseExercises }) {
  return (
    <header className="navbar">
      <a href="#home" className="logo">
        <span className="logo-mark" aria-hidden="true">GA</span>
        <span>GYM<span className="logo-accent">ATLAS</span></span>
      </a>

      <nav className="nav-links">
        <a href="#home">Trang chủ</a>
        <a href="#muscles">Nhóm cơ</a>
        <a href="#exercises" onClick={onBrowseExercises}>Bài tập</a>
        <a href="#schedule">Lịch tập</a>
        <a href="#workout-history">Nhật ký</a>
        <a href="#bmi">Tính BMI</a>
      </nav>

      <a href="#exercises" className="nav-button" onClick={onBrowseExercises}>
        Khám phá ngay
      </a>
    </header>
  );
}

export default Navbar;
