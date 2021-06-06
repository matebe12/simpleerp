const menuState = {
    menus: [
      {
        id:1,
        icon: "loop",
        title: "메뉴 설정",
        target: "Index",
      },
      {
        id:2,
        icon: "android",
        title: "페이지2",
        target: "Page2",
        model: false,
        childrens: [
          {
            id:21,
            icon: "assignment_ind",
            title: "페이지2_1",
            target: "Page2_1",
          },
          {
            id:22,
            icon: "people_alt",
            title: "페이지2_2",
            target: "Page2_2",
          }
        ]
      },
      {
        id:3,
        icon: "trending_up",
        title: "페이지3",
        target: "Page3",
      },
    ]
  }
    
  export default menuState;