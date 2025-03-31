import React from "react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export interface MenuItems {
  text: string;
  path: string;
  icon: React.ReactElement;
}

const UserMenuItems : MenuItems[] =  [
  { text: "Dashboard", path: "home", icon:<DashboardIcon className ='mt-1' /> },
  { text: "Workout", path: "workout", icon:<FitnessCenterIcon  />},
  { text: "Healthy Recipes", path: "healthyrecipes", icon:<MenuBookIcon />},
  { text: "Blogs & Articles", path: "blog", icon:<ArticleIcon />},
  { text: "Profile", path: "profile", icon:<PersonOutlineIcon />}
];

const AdminMenuItems: MenuItems[] = [
  { text: "Dashboard", path: "dashboard", icon:<DashboardIcon className ='mt-1' /> },
  { text: "Add Workout", path: "addworkout", icon:<FitnessCenterIcon  />},
  { text: "Add Blog", path: "addblog", icon:<ArticleIcon />},
  { text: "Add Nutrition", path: "addNutritionPlan", icon:<MenuBookIcon />},
  { text: "Workout", path: "allworkout", icon:<FitnessCenterIcon  />},
  { text: "Healthy Recipes", path: "allhealthyrecipes", icon:<MenuBookIcon />},
  { text: "Blogs & Articles", path: "allblog", icon:<ArticleIcon />},

];

export { UserMenuItems, AdminMenuItems };
