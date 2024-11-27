import React from "react";
import Slider from "react-slick"; // React-Slick import

const Home = () => {
  const settings = {
    dots: true, // 슬라이드 하단 점
    infinite: true, // 무한 슬라이드
    speed: 500, // 슬라이드 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
    autoplay: true, // 자동 슬라이드
    autoplaySpeed: 3000, // 자동 슬라이드 속도
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>원하는 메뉴를 편하게 주문해보아요.</h1>
      <Slider {...settings} style={{ width: "80%", margin: "0 auto" }}>
        {/* 슬라이드 이미지 추가 */}
        <div>
          <img
            src="https://via.placeholder.com/800x400?text=매장+사진+1"
            alt="매장 사진 1"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/800x400?text=대표+음식+1"
            alt="대표 음식 1"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/800x400?text=대표+음식+2"
            alt="대표 음식 2"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>
      </Slider>
      <div style={{ marginTop: "30px" }}>
        <p>
          매장을 방문해주셔서 감사합니다! 메뉴를 선택하고 주문을 진행하세요.
        </p>
        <a href="/menu">
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#007aff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            메뉴 보기
          </button>
        </a>
      </div>
    </div>
  );
};

export default Home;
