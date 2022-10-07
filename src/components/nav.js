import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./nav.module.css";
import { Menu } from "@mui/icons-material";

function Nav({ props }) {
  const [isShowNav, setIsShowNav] = useState(false);

  const navList = [
    {
      title: 'Who am I',
      route: '/who_am_i'
    },
    {
      title: 'Blog',
      route: '/blog'
    },
    {
      title: 'Logs',
      route: '/logs'
    },
  ];

  const onClick = (e) => {
    setIsShowNav(false);
  }

  return (
    <header onMouseLeave={(e) => { setIsShowNav(false); }}>
      <div className={styles.title}>
        <Link
          to="/"
          onClick={onClick}
        >
          Welcome to juhwan976.github.io
        </Link>
        <button
          className={styles.menu_button}
          onClick={(e) => { setIsShowNav(current => !current); }}
        >
          <Menu fontSize="large" style={{ color: "black" }} />
        </button>
      </div>
      <AnimatePresence>
        {isShowNav &&
          <motion.ul
            className={styles.navigation}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {
              navList.map(list => {
                return (
                  <motion.li
                    key={list.title}
                    variants={liVariants}
                    whileHover='whileHover'
                    transition='transition'
                    onClick={onClick}
                  >
                    <Link to={list.route}>
                      {list.title}
                    </Link>
                  </motion.li>);
              })
            }
          </motion.ul>}
      </AnimatePresence>
    </header>
  );
}

const liVariants = {
  whileHover: {
    scale: 1.2,
  },
  transition: {
    duration: 0.2,
  }
}

export default Nav;