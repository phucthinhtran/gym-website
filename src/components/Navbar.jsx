
function Navbar({ onBrowseExercises }) {
  return (
    <header className="navbar">
      <a href="#home" className="logo">
        GYM<span>ATLAS</span>
      </a>

      <nav className="nav-links">
        <a href="#home">Trang chủ</a>
        <a href="#muscles">Nhóm cơ</a>
        <a href="#exercises" onClick={onBrowseExercises}>Bài tập</a>
        <a href="#bmi">Tính BMI</a>
        <a href="#schedule">Lịch tập</a>
        <a href="#workout-history">Nhật ký</a>
      </nav>

      <a href="#exercises" className="nav-button" onClick={onBrowseExercises}>
        Khám phá ngay
      </a>
    </header>
  );
}

export default Navbar;
