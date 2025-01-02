import React, { useState, useEffect } from "react";
import "../styles/VersoinTwo.css";
import HoverBox from "../components/HoverBox";
const VersionTwoReporting = ({ startDate, endDate, selectedMetrics }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  const fetchData = async () => {
    if (!formattedStartDate || !formattedEndDate) {
      console.error("Start date or end date is missing");
      return;
    }
    try {
      setLoading(true);
      setLoadingProgress(0);
      setData([]);

      const interval = setInterval(() => {
        setLoadingProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 200);

      const response = await fetch(
        `https://facebookadsmangerserver.vercel.app/api/reporting/reporting/summed?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
      const result = await response.json();
      setData(result);
      console.log(result);
      clearInterval(interval);
      setLoadingProgress(100);
      setTimeout(() => setLoadingProgress(0), 500);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [formattedStartDate, formattedEndDate]);

  useEffect(() => {
    if (data.length > 0) {
      const dynamicColumns = selectedMetrics.map((metric) => ({
        title: metric,
        dataIndex: metric,
        width:
          metric === "Ad Creative"
            ? 300
            : metric === "Impression Device"
            ? 180
            : 150,
        render: (text, row, index) => {
          const previousRow = data[index - 1];
          // Handle specific formatting for "Impressions"
          // Handle specific formatting for CPC, CPM, and CTR
          if (["CPC", "CPM", "CTR"].includes(metric) && text) {
            const roundedValue = Number(text).toFixed(2); // Round off to two decimal places

            if (metric === "CTR") {
              return `${roundedValue}%`; // Append % for CTR
            }

            if (["CPC", "CPM"].includes(metric)) {
              return `$${roundedValue}`; // Append $ for CPC and CPM
            }
          }

          if (metric === "Impressions" && text) {
            return Number(text).toLocaleString("en-US"); // Apply comma-separated formatting
          }
          if (metric === "Link Clicks" && text) {
            return Number(text).toLocaleString("en-US"); // Apply comma-separated formatting
          }
          if (metric === "Amount Spent" && text) {
            return <div>${Number(text).toLocaleString("en-US")}</div>; // Apply comma-separated formatting
          }
          // Always display "Amount Spent" and "Impressions"
          if (
            metric === "Amount Spent" ||
            metric === "Impressions" ||
            metric === "Link Clicks" ||
            metric === "CTR" ||
            metric === "CPM" ||
            metric === "CPC"
          ) {
            return text;
          }

          // Handle hiding duplicate or empty values
          if (
            row[metric] === "All" || // Always show "All"
            !previousRow || // Show the first row
            previousRow[metric] !== row[metric] // Show if the value changes
          ) {
            if (metric === "Ad Name" && text) {
              return (
                <span
                  style={{
                    display: "inline-block",
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={text} // Full text on hover
                >
                  {text}
                </span>
              );
            }
            if (metric === "Campaign Name" && text) {
              return (
                <span
                  style={{
                    display: "inline-block",
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={text} // Full text on hover
                >
                  {text}
                </span>
              );
            }
            if (metric === "Ad Set Name" && text) {
              return (
                <span
                  style={{
                    display: "inline-block",
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={text} // Full text on hover
                >
                  {text}
                </span>
              );
            }

            if (metric === "Ad Creative" && text) {
              try {
                const creative = JSON.parse(text);
                return (
                  <div className="ad-creative-container">
                    {/* Ad Creative Thumbnail */}
                    <div>
                      <img
                        src={creative.image}
                        alt="Ad Creative"
                        className="ad-creative-thumbnail"
                      />
                    </div>

                    {/* Text Content */}
                    <div className="ad-creative-text">
                      <span className="ad-title">
                        {creative.title || "No Title"}
                      </span>
                      <span className="ad-description">
                        {creative.description
                          ? creative.description.length > 28
                            ? creative.description.slice(0, 28) + "..."
                            : creative.description
                          : "No Description"}
                      </span>
                      <span className="ad-used-in">Used in 1 Ad</span>
                    </div>

                    {/* Hover Ad Preview */}
                    <div className="hover-ad-preview">
                      {/* Placeholder for Ad Preview */}
                      <div className="ad-preview-placeholder">
                        <HoverBox
                          description={creative.description}
                          campaingImage={creative.image}
                          angryshow="1"
                          likesshow="10"
                          happyshow
                          commetsshow="3"
                          learnmorecenter={creative.title}
                          pagename={creative.title}
                        />
                      </div>
                    </div>
                  </div>
                );
              } catch {
                return text;
              }
            }

            return text;
          }

          // Completely hide the cell for duplicate or empty values
          return null;
        },
      }));
      setColumns(dynamicColumns);
    }
  }, [selectedMetrics, data]);

  return (
    <div
      className="versointowsirtable"
      style={{
        width: "100%",
        height: "500px",
        backgroundColor: "white",
        overflowX: "auto",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", padding: "" }}>
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${loadingProgress}%`,
              height: "4px",
              backgroundColor: "#1890ff",
              transition: "width 0.2s ease-in-out",
            }}
          ></div>
        )}
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          tableLayout: "fixed",
        }}
      >
        <thead
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#f5f5f5",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Add shadow on the bottom
            zIndex: 999,
          }}
        >
          <tr>
            {columns.map((col) => (
              <th
                key={col.dataIndex}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                  width: `${col.width}px`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start", // Align items to the top
                    justifyContent: "flex-start", // Align items horizontally to the start
                    minWidth: "120px",
                    minHeight: "50px",
                  }}
                >
                  <div class="x1vjfegm xsgj6o6 x1gslohp">
                    <div class="_3qn7 _61-0 _2fyh _3qnf">
                      <div class="_3qn7 _61-0 _2fyi _3qnf">
                        <div
                          role="columnheader"
                          tabindex="-1"
                          data-interactable="|mouseover|"
                        >
                          <span
                            aria-level="2"
                            class="x1xqt7ti xm46was x1jrz1v4 xbsr9hj xq9mrsl x1h4wwuj x117nqv4 xeuugli"
                            role="heading"
                          >
                            <div class="_90u_ style-rFHj4" id="style-rFHj4">
                              <div
                                class="_4ik4 _4ik5 style-qAlZS"
                                id="style-qAlZS"
                              >
                                <div id="style-zqMp6" class="style-zqMp6">
                                  {
                                    col.title === "CPC"
                                      ? "CPC (Cost per Link Click)"
                                      : col.title === "CPM"
                                      ? "CPM (Cost per 1,000 Impressions)"
                                      : col.title === "CTR"
                                      ? "CTR (All)"
                                      : col.title // Default to the key itself for other titles
                                  }
                                </div>
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                      <div class="xmi5d70 xw23nyj xo1l8bm x63nzvj x1541jtf xuxw1ft x6ikm8r x10wlt62 xlyipyv x1h4wwuj xeuugli"></div>
                    </div>
                  </div>
                  <div class="x1gryazu x1vjfegm xxk0z11 xvy4d1p">
                    <div class="x1gryazu xxk0z11">
                      <div>
                        <button
                          aria-pressed="false"
                          type="button"
                          aria-disabled="false"
                          class="_271k _271l _1o4e _1qjd _ai7j _ai7k _ai7m style-X4qQs"
                          id="style-X4qQs"
                        >
                          <div class="_43rl">
                            <i
                              aria-hidden="true"
                              class="_271o img style-DgV47"
                              alt=""
                              data-visualcompletion="css-img"
                              id="style-DgV47"
                            ></i>
                            <span class="accessible_elem">
                              Open Inline Column Action Menu
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => {
              const isFirstPageGroup =
                index === 0 ||
                row["Page Name"] !== data[index - 1]["Page Name"]; // Check if the row is the first of a new Page Name group

              const isFirstCampaignGroup =
                index === 0 ||
                row["Campaign Name"] !== data[index - 1]["Campaign Name"]; // Check if the row is the first of a new Campaign Name group

              return (
                <tr
                  key={index}
                  style={{
                    backgroundColor: isFirstPageGroup
                      ? "#f3f5f4" // Apply specific background color for first row of each Page Name group
                      : isFirstCampaignGroup
                      ? "#f9f9f9" // Apply specific background color for first row of each Campaign Name group
                      : "white", // Default background color
                  }}
                >
                  {columns.map((col) => {
                    const hideColumns = [
                      "Page Name",
                      "Campaign Name",
                      "Ad Set Name",
                      "Ad Name",
                      "Ad Creative",
                      "Impression Device",
                    ];

                    const shouldHide =
                      hideColumns.includes(col.title) &&
                      row[col.dataIndex] !== "All" && // Always show "All"
                      index > 0 &&
                      row[col.dataIndex] === data[index - 1][col.dataIndex]; // Hide duplicates

                    const hideBottomBorder =
                      index + 1 < data.length &&
                      row[col.dataIndex] === data[index + 1][col.dataIndex]; // Hide bottom border if next row is the same

                    const isHighlightedColumn =
                      ["Campaign Name", "Ad Set Name", "Ad Name"].includes(
                        col.title
                      ) && row[col.dataIndex] !== "All"; // Highlight specific columns after "Alls"

                    return (
                      <td
                        key={col.dataIndex}
                        style={{
                          borderTop: shouldHide ? "none" : "1px solid #ddd",
                          borderBottom: hideBottomBorder
                            ? "none"
                            : "1px solid #ddd", // Conditionally hide bottom border
                          borderLeft: "1px solid #ddd", // Keep left border
                          borderRight: "1px solid #ddd", // Keep right border
                          padding: shouldHide ? "0" : "10px 5px",

                          textAlign: "left",
                          visibility: shouldHide ? "hidden" : "visible",
                          backgroundColor: shouldHide
                            ? "transparent"
                            : "inherit", // Ensure hidden cells blend in
                          color:
                            isHighlightedColumn && !shouldHide
                              ? "#0a78be"
                              : "#1c2b33", // Apply color to specific columns
                          fontWeight:
                            isHighlightedColumn && !shouldHide
                              ? "normal"
                              : "normal", // Make highlighted text bold
                          fontSize: "14px",
                        }}
                      >
                        {shouldHide
                          ? null
                          : col.render
                          ? col.render(row[col.dataIndex], row, index)
                          : row[col.dataIndex] || null}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                {loading ? "Loading..." : "No Data Available"}
              </td>
            </tr>
          )}
        </tbody>

        <tfoot
          style={{
            position: "sticky",
            bottom: 0,
            height: "60px",
            backgroundColor: "white",
            zIndex: 2,
            boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.1)", // Add shadow on top
          }}
        >
          {data.length > 0 && (
            <tr>
              {columns.map((col) => (
                <td
                  key={col.dataIndex}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                    fontWeight: "normal",
                  }}
                >
                  {/* Check if column title is "Page Name" */}
                  {col.title === "Page Name" ? (
                    <div className="_2pi7">
                      <div className="_68tl style-BF6vh" id="style-BF6vh">
                        <div className="_2eqm style-msgLz" id="style-msgLz">
                          <div className="_2eqm _3qn7 _61-0 _2fyi _3qng">
                            <div className="_3qn7 _61-0 _2fyh _3qnf">
                              <div className="_3qn7 _61-0 _2fyi _3qng">
                                <div className="xmi5d70 x1fvot60 xxio538 xbsr9hj xuxw1ft x6ikm8r x10wlt62 xlyipyv x1h4wwuj x117nqv4 xeuugli">
                                  Total results
                                </div>
                              </div>
                              <div className="xmi5d70 xw23nyj xo1l8bm x63nzvj x1541jtf xuxw1ft x6ikm8r x10wlt62 xlyipyv x1h4wwuj xeuugli">
                                {data?.length}/{data?.length} rows displayed
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : col.title === "Amount Spent" ? (
                    <div class="_e9n" style={{ textAlign: "right" }}>
                      <div class="">
                        <div
                          geotextcolor="value"
                          data-hover="tooltip"
                          data-tooltip-display="overflow"
                          data-tooltip-text-direction="auto"
                          class="xmi5d70 x1fvot60 xo1l8bm xxio538 x1lliihq x6ikm8r x10wlt62 xlyipyv xuxw1ft xbsr9hj"
                        >
                          <span class="_3dfi _3dfj">
                            ${data[0]?.[col.dataIndex]?.toLocaleString()}
                          </span>
                        </div>
                        <div
                          class="ellipsis _1ha4"
                          data-hover="tooltip"
                          data-tooltip-display="overflow"
                          data-tooltip-text-direction="auto"
                        >
                          <div class="xt0psk2 xmi5d70 xw23nyj xo1l8bm x63nzvj x1541jtf">
                            Total Spent
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : col.title === "Impressions" ? (
                    <div class="_e9n" style={{ textAlign: "right" }}>
                      <div class="">
                        <div
                          geotextcolor="value"
                          data-hover="tooltip"
                          data-tooltip-display="overflow"
                          data-tooltip-text-direction="auto"
                          class="xmi5d70 x1fvot60 xo1l8bm xxio538 x1lliihq x6ikm8r x10wlt62 xlyipyv xuxw1ft xbsr9hj"
                        >
                          <span class="_3dfi _3dfj">
                            {data[0]?.[col.dataIndex]?.toLocaleString()}
                          </span>
                        </div>
                        <div
                          class="ellipsis _1ha4"
                          data-hover="tooltip"
                          data-tooltip-display="overflow"
                          data-tooltip-text-direction="auto"
                        >
                          <div class="xt0psk2 xmi5d70 xw23nyj xo1l8bm x63nzvj x1541jtf">
                            Total
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : col.dataIndex === "Link Clicks" ? (
                    <div class="_e9n">
                      <div class="">
                        <div
                          style={{ textAlign: "right" }}
                          geotextcolor="value"
                          data-hover="tooltip"
                          data-tooltip-display="overflow"
                          data-tooltip-text-direction="auto"
                          class="xmi5d70 x1fvot60 xo1l8bm xxio538 x1lliihq x6ikm8r x10wlt62 xlyipyv xuxw1ft xbsr9hj"
                        >
                          <span class="_3dfi _3dfj">
                            <span class="_3dfi _3dfj">
                              {typeof data[0]?.[col.dataIndex] === "number"
                                ? data[0]?.[col.dataIndex].toLocaleString(
                                    undefined,
                                    {
                                      maximumFractionDigits: 2,
                                    }
                                  )
                                : data[0]?.[col.dataIndex]}
                            </span>
                          </span>
                        </div>
                        <div
                          style={{ textAlign: "right" }}
                          class="ellipsis _1ha4"
                          data-hover="tooltip"
                          data-tooltip-display="overflow"
                          data-tooltip-text-direction="auto"
                        >
                          <div class="xt0psk2 xmi5d70 xw23nyj xo1l8bm x63nzvj x1541jtf">
                            Total
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : col.dataIndex === "CPM" ? (
                    <div class="_e9n">
                      <div class="">
                        <div
                          style={{ textAlign: "right" }}
                          geotextcolor="value"
                          data-hover="tooltip"
                          data-tooltip-display="overflow"
                          data-tooltip-text-direction="auto"
                          class="xmi5d70 x1fvot60 xo1l8bm xxio538 x1lliihq x6ikm8r x10wlt62 xlyipyv xuxw1ft xbsr9hj"
                        >
                          <span class="_3dfi _3dfj">
                            ${" "}
                            {typeof data[0]?.[col.dataIndex] === "number"
                              ? data[0]?.[col.dataIndex].toLocaleString(
                                  undefined,
                                  {
                                    maximumFractionDigits: 2,
                                  }
                                )
                              : data[0]?.[col.dataIndex]}
                          </span>
                        </div>
                        <div
                          style={{ textAlign: "right" }}
                          class="ellipsis _1ha4"
                          data-hover="tooltip"
                          data-tooltip-display="overflow"
                          data-tooltip-text-direction="auto"
                        >
                          <div class="xt0psk2 xmi5d70 xw23nyj xo1l8bm x63nzvj x1541jtf">
                            Per 1,000 Impressions
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : col.dataIndex === "CTR" ? (
                    <div class="_e9n">
                      <div class="">
                        <div
                          style={{ textAlign: "right" }}
                          geotextcolor="value"
                          data-hover="tooltip"
                          data-tooltip-display="overflow"
                          data-tooltip-text-direction="auto"
                          class="xmi5d70 x1fvot60 xo1l8bm xxio538 x1lliihq x6ikm8r x10wlt62 xlyipyv xuxw1ft xbsr9hj"
                        >
                          <span class="_3dfi _3dfj">
                            {typeof data[0]?.[col.dataIndex] === "number"
                              ? data[0]?.[col.dataIndex].toLocaleString(
                                  undefined,
                                  {
                                    maximumFractionDigits: 2,
                                  }
                                )
                              : data[0]?.[col.dataIndex]}
                            %
                          </span>
                        </div>
                        <div
                          style={{ textAlign: "right" }}
                          class="ellipsis _1ha4"
                          data-hover="tooltip"
                          data-tooltip-display="overflow"
                          data-tooltip-text-direction="auto"
                        >
                          <div class="xt0psk2 xmi5d70 xw23nyj xo1l8bm x63nzvj x1541jtf">
                            Per 1,000 Impressions
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : col.dataIndex === "CPC" ? (
                    <div class="_e9n">
                      <div class="">
                        <div
                          style={{ textAlign: "right" }}
                          geotextcolor="value"
                          data-hover="tooltip"
                          data-tooltip-display="overflow"
                          data-tooltip-text-direction="auto"
                          class="xmi5d70 x1fvot60 xo1l8bm xxio538 x1lliihq x6ikm8r x10wlt62 xlyipyv xuxw1ft xbsr9hj"
                        >
                          <span class="_3dfi _3dfj">
                            ${" "}
                            {typeof data[0]?.[col.dataIndex] === "number"
                              ? data[0]?.[col.dataIndex].toLocaleString(
                                  undefined,
                                  {
                                    maximumFractionDigits: 2,
                                  }
                                )
                              : data[0]?.[col.dataIndex]}
                          </span>
                        </div>
                        <div
                          style={{ textAlign: "right" }}
                          class="ellipsis _1ha4"
                          data-hover="tooltip"
                          data-tooltip-display="overflow"
                          data-tooltip-text-direction="auto"
                        >
                          <div class="xt0psk2 xmi5d70 xw23nyj xo1l8bm x63nzvj x1541jtf">
                            Per Action
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : [
                      "Campaign Name",
                      "Ad Set Name",
                      "Ad Name",
                      "Ad Creative",
                      "Impression Device",
                      "Placement",
                    ].includes(col.title) ? (
                    ""
                  ) : (
                    data[0][col.dataIndex] || "N/A"
                  )}
                </td>
              ))}
            </tr>
          )}
        </tfoot>
      </table>
    </div>
  );
};

export default VersionTwoReporting;
