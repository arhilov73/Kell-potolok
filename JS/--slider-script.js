// Read about the Intersection Observer API here https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

// More on using the Intersection Observer to create a gallery here: https://dev.to/joostkiens/creating-practical-instagram-like-galleries-and-horizontal-lists-with-css-scroll-snapping-580e
"use strict";

window.onload = (event) => {
  console.log(`👩🏼‍💻 Log system is a feature not a bug`);

  // references to DOM elements
  const wrapper = document.querySelector(".gallery_wrapper");
  const list = document.querySelector(".gallery_wrapper ul");
  const items = Array.from(document.querySelectorAll(".gallery_wrapper  li"));
  //You can also uncomment the HTML hard-coded values and query from the HTML document directly. Otherwise set the pagination settings bellow.
  //const indicators = Array.from(document.querySelectorAll(".indicator"));

  //general settings
  const settings = {
    pagination: {
      show: true,
      type: "all" //"arrows" |  "all" | "pagination"
      /*"all" for the complete list: suitable for small lists || arrows with click interaction left and right with a current page/pages indicator: under development || "pagination": roadmap */
    },
    observerOptions: {
      root: list, //list for parent element, Or null for viewport
      rootMargin: "0px",
      threshold: 0.85
    }
  };

  /*
  Simple State control Functionality
  Original idea found at https://viktorfejes.com/article/simple-state-management-with-vanilla-js
  */
  const state = {
    isPaginationRendered: false,
    currentPageIndex: 0,
    intersectingTargetsIndexes: [],
    setState: function (targetName, curentTargetValue, newTargetValue) {
      //assign new value
      this[targetName] = newTargetValue;
      //run call back function
      stateChange(targetName, curentTargetValue, newTargetValue);
    }
  };

  function stateChange(targetName, target, value) {
    //logging is a feature not a bug
    console.log(
      `😲 State of ${targetName} with value ${target} has changed to ${value}`
    );
    // Do something when state updates
    switch (targetName) {
      case "isPaginationRendered":
        if (value === true) {
          console.log("isPaginationRendered switched to true 👍");
        } else {
          console.log("isPaginationRendered is now false 👎");
        }
        break;
      case "currentPageIndex":
        console.log("currentPageIndex: ", value);
        break;
      case "intersectingTargetsIndexes":
        console.log("intersectingTargetsIndexes: ", value);
        break;
      default:
        break;
    }
  }

  /* Intersection Observer Functionality */

  // create an observer with the list as intersection root
  const observer = new IntersectionObserver(
    onIntersectionObserved,
    settings.observerOptions
  );

  // observe each item
  items.forEach((item) => {
    observer.observe(item);
  });

  // when the observer detects an entry changing
  // (item entering or exiting  list)
  // and the entry is intersecting
  // get the intersecting item’s index
  // set the correct indicator to active

  let map = [];

  function onIntersectionObserved(entries) {
    entries.forEach((entry, index) => {
      const intersectingIndex = items.indexOf(entry.target);

      if (entry.isIntersecting) {
        map = [...map, intersectingIndex];

        state.setState(
          "currentPageIndex",
          state.currentPageIndex,
          intersectingIndex
        );
      } else {
        map = map.filter((item) => item !== intersectingIndex);
      }
    });

    const intersectingIndexes = map.sort((a, b) => a - b);

    state.setState(
      "intersectingTargetsIndexes",
      state.intersectingTargetsIndexes,
      intersectingIndexes
    );

    activateGalleryItem(state.intersectingTargetsIndexes);

    if (settings.pagination.show) {
      //call the navigation callback
      navigation(settings.pagination, state.intersectingTargetsIndexes);

      if (settings.pagination.type === "all") {
        activateIndicators(
          state.intersectingTargetsIndexes,
          document.querySelectorAll(".indicator")
        );
      }
    }
  }

  // toggle an `active` class on the indicators
  const activateIndicators = (targetIndexes, indicators) => {
    targetIndexes.forEach((index) => {
      indicators.forEach((indicator, i) => {
        if (targetIndexes.includes(i)) indicator.classList.add("active");
        else indicator.classList.remove("active");
      });
    });
  };

  // toggle an `active` class on the gallery items
  const activateGalleryItem = (targetIndexes) => {
    targetIndexes.forEach((targetIndex) => {
      items.forEach((item, i) => {
        if (targetIndexes.includes(i)) item.classList.add("active");
        else item.classList.remove("active");
      });
    });
  };

  const navigation = (navigationSettings, intersectingTargetsIndexes) => {
    if (navigationSettings.show) {
      switch (navigationSettings.type) {
        case "all":
          buildCompleteNavigationList();
          break;
        case "arrows":
          buildArrowNavigation(intersectingTargetsIndexes);
          break;
        case "pagination":
          break;
        default:
          break;
      }
    }
  };

  //navigation rendering functions
  const buildCompleteNavigationList = () => {
    const navigationWrapper = document.createElement("div");
    navigationWrapper.setAttribute("class", "indicatorsList");

    //Create navigation wrapper element once
    if (!state.isPaginationRendered) {
      wrapper.appendChild(navigationWrapper);

      //build indicators/buttons
      items.forEach((item, index) => {
        let navigationButton = document.createElement("div");
        navigationButton.appendChild(document.createTextNode(index + 1));
        navigationButton.setAttribute("class", "indicator");
        navigationWrapper.appendChild(navigationButton);
        navigationButton.addEventListener("click", () =>
          item.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
          })
        );
      });
      state.setState("isPaginationRendered", state.isPaginationRendered, true);
    }
  };

  const buildArrowNavigation = (intersectingTargetsIndexes) => {
    const navigationWrapper = domArrowNavigation(
      state.isPaginationRendered,
      intersectingTargetsIndexes
    );
  };

  //helper functions

  const domArrowNavigation = (isRendered, intersectingTargetsIndexes) => {
    const documentFragment = document.createDocumentFragment();

    if (!isRendered) {
      var navigationWrapper = document.createElement("div");
      var previousButton = document.createElement("button");
      var nextButton = document.createElement("button");
      var infoText = document.createElement("p");

      //elements
      navigationWrapper.setAttribute("class", "indicatorsList");

      //Previous button
      previousButton.appendChild(document.createTextNode("<"));
      previousButton.setAttribute("class", "previous");
      documentFragment.appendChild(previousButton);

      //info
      infoText.setAttribute("class", "paging");

      infoText.textContent =
        intersectingTargetsIndexes.map((x) => x + 1).toString() +
        " / " +
        items.length;
      documentFragment.appendChild(infoText);

      //next button
      nextButton.appendChild(document.createTextNode(">"));
      nextButton.setAttribute("class", "next");
      documentFragment.appendChild(nextButton);

      navigationWrapper.appendChild(documentFragment);

      wrapper.appendChild(navigationWrapper);

      state.setState("isPaginationRendered", state.isPaginationRendered, true);
    } else {
      //Clone

      var navigationWrapper = wrapper
        .querySelector(".indicatorsList")
        .cloneNode(true);
      var infoText = navigationWrapper.querySelector(".paging");
      infoText.textContent =
        intersectingTargetsIndexes.map((x) => x + 1).toString() +
        " / " +
        items.length;
      documentFragment.appendChild(navigationWrapper);
      wrapper.replaceChild(
        documentFragment,
        wrapper.querySelector(".indicatorsList")
      );
    }

    if (intersectingTargetsIndexes[0] !== 0) {
      wrapper.querySelector(".previous").addEventListener("click", () =>
        items[intersectingTargetsIndexes[0] - 1].scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center"
        })
      );
    }

    if (
      intersectingTargetsIndexes[intersectingTargetsIndexes.length - 1] <
      items.length - 1
    ) {
      wrapper.querySelector(".next").addEventListener("click", () => {
        items[
          intersectingTargetsIndexes[intersectingTargetsIndexes.length - 1] + 1
        ].scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center"
        });
      });
    }

    return navigationWrapper;
  };

  //helper function
  
  /*function paginate(totalItems, currentPage, pageSize, maxPages) {
    if (currentPage === void 0) {
      currentPage = 1;
    }
    if (pageSize === void 0) {
      pageSize = 10;
    }
    if (maxPages === void 0) {
      maxPages = 10;
    }
    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);
    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }
    var startPage, endPage;
    if (totalPages <= maxPages) {
      // total pages less than max so show all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // total pages more than max so calculate start and end pages
      var maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      var maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        // current page near the start
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // current page near the end
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        // current page somewhere in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }
    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    var pages = Array.from(Array(endPage + 1 - startPage).keys()).map(function (
      i
    ) {
      return startPage + i;
    });
    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }*/
};
