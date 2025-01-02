import React, { useEffect, useState } from "react";
import "../styles/SideBar.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const SideBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [account, setAccount] = useState({});
  const location = useLocation();
  console.log(location.pathname);

  const handleNavigation = (page) => {
    if (page === "overviewaccount") {
      navigate("/overviewaccount");
    } else if (page === "reporting") {
      navigate("/reporting");
    } else if (page === "payment") {
      navigate("/payment");
    } else if (page === "mainnavigation") {
      navigate("/mainnavigation");
    } else {
      navigate("/"); // Default to home
    }
  };

  const fetchAccount = async () => {
    try {
      const response = await axios.get(
        "https://facebookadsmangerserver.vercel.app/api/currentAccount/67200546611ee42d41ae600f"
      );
      setAccount(response.data);
    } catch (error) {
      console.error("Error fetching account:", error);
    }
  };
  useEffect(() => {
    fetchAccount();
  }, []);
  return (
    <div className="sidebarmaincontainer">
      <div
        className={`sidebar ${isHovered ? "sidebar-expanded" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className=""
          style={{
            width: "100%",
            paddingLeft: "30px",
            paddingTop: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            alt="Meta"
            className="img"
            height="28"
            width="28"
            src="https://static.xx.fbcdn.net/rsrc.php/yb/r/CnOoIyhtLSO.svg"
          />
          {isHovered && (
            <span>
              <h2 style={{ marginLeft: "2px" }}>Meta</h2>
            </span>
          )}
        </div>

        <div className="" style={{ width: "100%" }}>
          {isHovered && (
            <span style={{ marginLeft: "20px" }}>
              <h1 style={{ fontSize: "23px", paddingLeft: "25px" }}>
                Ads Manager
              </h1>
            </span>
          )}
        </div>

        <ul className="menu">
          <li>
            <div
              className="letbordchange"
              style={
                isHovered
                  ? {
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #f3f3f3",
                      width: "100%",
                      padding: "5px",
                      borderRadius: "5px",
                    }
                  : { display: "flex", alignItems: "center" }
              }
            >
              <img
                style={{ borderRadius: "5px", width: "28px", height: "28px" }}
                alt="Meta"
                className="sssssimg"
                height="28"
                width="28"
                src={account?.mainAccountImage}
              />
              {isHovered && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",

                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        marginLeft: "20px",
                        fontWeight: "bold",
                        color: "gray",
                        fontSize: "13px",
                      }}
                    >
                      {account?.mainAccountname}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignSelf: "center",
                        placeSelf: "center",
                        justifySelf: "flex-end",
                        width: "1005",
                      }}
                      className="x3nfvp2 x120ccyz x4s1yf2"
                      role="presentation"
                    >
                      <div
                        className="xtwfq29 style-NEN4Q"
                        id="style-NEN4Q"
                      ></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </li>

          <li
            onClick={() => handleNavigation("overviewaccount")}
            style={
              location.pathname === "/overviewaccount"
                ? { textDecoration: "none", backgroundColor: "#C3DCF5" }
                : { textDecoration: "none" }
            }
          >
            <div className="x78zum5 x1n2onr6 x2lah0s x6s0dn4 xl56j7k xvy4d1p xxk0z11">
              <div className="x3nfvp2">
                <i
                  alt=""
                  data-visualcompletion="css-img"
                  className="img style-sSl3X"
                  id="style-sSl3X"
                ></i>
              </div>
              <div className="x13dflua xxziih7 x12w9bfk x10l6tqk x1fo6t33 xoo4vsp x78zum5 x6s0dn4 x11xpdln x3oybdh"></div>
            </div>
            {isHovered && (
              <span style={{ marginLeft: "20px" }}>
                <div
                  className="x1xqt7ti x1uxerd5 xrohxju xbsr9hj xuxw1ft x6ikm8r x10wlt62 xlyipyv x1h4wwuj x1fcty0u xeuugli"
                  id="js_h"
                >
                  Account overview
                </div>
              </span>
            )}
          </li>

          <li
            onClick={() => handleNavigation("")}
            style={
              location.pathname === "/" ||
              location.pathname.startsWith("/editcampaing/") ||
              location.pathname.startsWith("/editcampaingtwo/") ||
              location.pathname.startsWith("/editcampaingthree/")
                ? { textDecoration: "none", backgroundColor: "#C3DCF5" }
                : { textDecoration: "none" }
            }
          >
            {location.pathname === "/" ||
            location.pathname.startsWith("/editcampaing/") ||
            location.pathname.startsWith("/editcampaingtwo/") ||
            location.pathname.startsWith("/editcampaingthree/") ? (
              <div class="x78zum5 x1n2onr6 x2lah0s x6s0dn4 xl56j7k x1qsmy5i xvy4d1p xxk0z11">
                <div class="x3nfvp2">
                  <i
                    alt=""
                    data-visualcompletion="css-img"
                    class="img style-bolNn"
                    id="style-bolNn"
                  ></i>
                </div>
              </div>
            ) : (
              <div class="">
                <div class="x78zum5 x1n2onr6 x2lah0s x6s0dn4 xl56j7k xvy4d1p xxk0z11">
                  <div class="x3nfvp2">
                    <i
                      alt=""
                      data-visualcompletion="css-img"
                      class="img style-9ysPi"
                      id="style-9ysPi"
                    ></i>
                  </div>
                </div>
              </div>
            )}

            {isHovered && (
              <span style={{ marginLeft: "20px" }}>
                <div
                  className="x1xqt7ti x1uxerd5 xrohxju xbsr9hj xuxw1ft x6ikm8r x10wlt62 xlyipyv x1h4wwuj x1fcty0u xeuugli"
                  id="js_h"
                  style={
                    location.pathname === "/" ||
                    location.pathname.startsWith("/editcampaing/") ||
                    location.pathname.startsWith("/editcampaingtwo/") ||
                    location.pathname.startsWith("/editcampaingthree/")
                      ? {
                          textDecoration: "none",
                          color: "#0866ff",
                        }
                      : { textDecoration: "none" }
                  }
                >
                  Campaigns
                </div>
              </span>
            )}
          </li>

          <li
            onClick={() => handleNavigation("reporting")}
            style={
              location.pathname === "/reporting"
                ? { textDecoration: "none", backgroundColor: "#C3DCF5" }
                : { textDecoration: "none" }
            }
          >
            {location.pathname === "/reporting" ? (
              <div class="">
                <div class="x3nfvp2">
                  <i
                    alt=""
                    data-visualcompletion="css-img"
                    class="img style-K9LEW"
                    id="style-K9LEW"
                  ></i>
                </div>
              </div>
            ) : (
              <div className="x78zum5 x1n2onr6 x2lah0s x6s0dn4 xl56j7k xvy4d1p xxk0z11">
                <div className="x3nfvp2">
                  <i
                    alt=""
                    data-visualcompletion="css-img"
                    className="img style-Gd5tE"
                    id="style-Gd5tE"
                  ></i>
                </div>
              </div>
            )}

            {isHovered && (
              <span style={{ marginLeft: "20px" }}>
                <div
                  className="x1xqt7ti x1uxerd5 xrohxju xbsr9hj xuxw1ft x6ikm8r x10wlt62 xlyipyv x1h4wwuj x1fcty0u xeuugli"
                  id="js_h"
                  style={
                    location.pathname === "/reporting"
                      ? {
                          textDecoration: "none",
                          color: "#0866ff",
                        }
                      : { textDecoration: "none" }
                  }
                >
                  Ads Reporting
                </div>
              </span>
            )}
          </li>

          <li>
            <div className="x78zum5 x1n2onr6 x2lah0s x6s0dn4 xl56j7k xvy4d1p xxk0z11">
              <div className="x3nfvp2">
                <i
                  alt=""
                  data-visualcompletion="css-img"
                  className="img style-4NOtb"
                  id="style-4NOtb"
                ></i>
              </div>
            </div>
            {isHovered && (
              <span style={{ marginLeft: "20px" }}>
                <div
                  className="x1xqt7ti x1uxerd5 xrohxju xbsr9hj xuxw1ft x6ikm8r x10wlt62 xlyipyv x1h4wwuj x1fcty0u xeuugli"
                  id="js_h"
                >
                  Audience
                </div>
              </span>
            )}
          </li>

          <li
            onClick={() => handleNavigation("payment")}
            style={
              location.pathname === "/payment"
                ? { textDecoration: "none", backgroundColor: "#C3DCF5" }
                : { textDecoration: "none" }
            }
          >
            {location.pathname === "/payment" ? (
              <div class="">
                <div class="">
                  <div class="x3nfvp2">
                    <i
                      alt=""
                      data-visualcompletion="css-img"
                      class="img sp_BCSohYmDE5w sx_4fb158"
                    ></i>
                  </div>
                </div>
              </div>
            ) : (
              <div className="x78zum5 x1n2onr6 x2lah0s x6s0dn4 xl56j7k xvy4d1p xxk0z11">
                <div className="x3nfvp2">
                  <i
                    alt=""
                    data-visualcompletion="css-img"
                    className="img style-yZkhQ"
                    id="style-yZkhQ"
                  ></i>
                </div>
              </div>
            )}

            {isHovered && (
              <span style={{ marginLeft: "20px" }}>
                <div
                  className="x1xqt7ti x1uxerd5 xrohxju xbsr9hj xuxw1ft x6ikm8r x10wlt62 xlyipyv x1h4wwuj x1fcty0u xeuugli"
                  id="js_h"
                  style={
                    location.pathname === "/payment"
                      ? {
                          textDecoration: "none",
                          color: "#0866ff",
                        }
                      : { textDecoration: "none" }
                  }
                >
                  Billing & payment
                </div>
              </span>
            )}
          </li>

          <li>
            <div className="x78zum5 x1n2onr6 x2lah0s x6s0dn4 xl56j7k xvy4d1p xxk0z11">
              <div className="x3nfvp2">
                <i
                  alt=""
                  data-visualcompletion="css-img"
                  className="img style-qjhZw"
                  id="style-qjhZw"
                ></i>
              </div>
            </div>
            {isHovered && (
              <span style={{ marginLeft: "20px" }}>
                <div
                  className="x1xqt7ti x1uxerd5 xrohxju xbsr9hj xuxw1ft x6ikm8r x10wlt62 xlyipyv x1h4wwuj x1fcty0u xeuugli"
                  id="js_h"
                >
                  Advertising settings
                </div>
              </span>
            )}
          </li>
          <li>
            <div className="">
              <div className="x78zum5 x1iyjqo2">
                <div className="">
                  <div className="">
                    <div className="x3nfvp2">
                      <i
                        alt=""
                        data-visualcompletion="css-img"
                        className="img style-8dtnG"
                        id="style-8dtnG"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isHovered && (
              <span style={{ marginLeft: "20px" }}>
                <div
                  className="x1xqt7ti x1uxerd5 xrohxju xbsr9hj xuxw1ft x6ikm8r x10wlt62 xlyipyv x1h4wwuj x1fcty0u xeuugli"
                  id="js_h"
                >
                  Event Manager
                </div>
              </span>
            )}
          </li>
          <li>
            <div className="">
              <div className="x3nfvp2">
                <i
                  alt=""
                  data-visualcompletion="css-img"
                  className="img style-rRLCD"
                  id="style-rRLCD"
                ></i>
              </div>
            </div>

            {isHovered && (
              <span style={{ marginLeft: "20px" }}>
                <div
                  className="x1xqt7ti x1uxerd5 xrohxju xbsr9hj xuxw1ft x6ikm8r x10wlt62 xlyipyv x1h4wwuj x1fcty0u xeuugli"
                  id="js_h"
                >
                  All Tools
                </div>
              </span>
            )}
          </li>
          <li>
            <div className="">
              <i
                alt=""
                data-visualcompletion="css-img"
                className="img style-M9oOk"
                id="style-M9oOk"
              ></i>
            </div>

            {isHovered && (
              <span style={{ marginLeft: "20px" }}>
                <div
                  className="x1xqt7ti x1uxerd5 xrohxju xbsr9hj xuxw1ft x6ikm8r x10wlt62 xlyipyv x1h4wwuj x1fcty0u xeuugli"
                  id="js_h"
                >
                  Help
                </div>
              </span>
            )}
          </li>
        </ul>
        <hr className="divider" />
        <div className="bottom-icons">
          <div className="search-icon">
            <div className="x6s0dn4 x78zum5 x1q0g3np xozqiw3 x2lwn1j xeuugli x1iyjqo2 x19lwn94 x1hc1fzr x13dflua x6o7n8i xxziih7 x12w9bfk xl56j7k xh8yej3">
              <div
                className="x3nfvp2 x120ccyz x1heor9g x2lah0s x1c4vz4f"
                role="presentation"
              >
                <div className="xtwfq29 style-9KpMj" id="style-9KpMj"></div>
              </div>
            </div>
          </div>
          <div className="search-icon">
            <div className="x3nfvp2 x2lah0s x1c4vz4f">
              <i
                alt=""
                data-visualcompletion="css-img"
                className="img style-2xUJN"
                id="style-2xUJN"
              ></i>
            </div>
          </div>
          <div className="search-icon">
            <div className="">
              <i
                aria-hidden="true"
                className="_271o img style-ZBf6z"
                alt=""
                data-visualcompletion="css-img"
                id="style-ZBf6z"
              ></i>
            </div>
          </div>

          <div className="search-icon">
            <div className="x6s0dn4 x78zum5 x1q0g3np xozqiw3 x2lwn1j xeuugli x1iyjqo2 x19lwn94 x1hc1fzr x13dflua x6o7n8i xxziih7 x12w9bfk xl56j7k xh8yej3">
              <div
                className="x3nfvp2 x120ccyz x1heor9g x2lah0s x1c4vz4f"
                role="presentation"
              >
                <div className="xtwfq29 style-AA4xG" id="style-AA4xG"></div>
              </div>
              ​
            </div>
          </div>

          <div className="search-icon">
            <div className="">
              <div
                onClick={() => handleNavigation("mainnavigation")}
                className="x3nfvp2 x2lah0s x1c4vz4f"
              >
                <i
                  alt=""
                  data-visualcompletion="css-img"
                  className="img style-oF4KY"
                  id="style-oF4KY"
                ></i>
              </div>
              ​
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
