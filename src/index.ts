import "core-js/stable";
import "regenerator-runtime/runtime";

import Configstore from "configstore";
import { titleScreen } from "pickitt";

import EventEmitter from "events";

import { displayMainMenu, interpretMenuAction } from "./menu";

import { AppState } from "../types";

const shorex = async (): Promise<void> => {
  const menuActionEmitter = new EventEmitter.EventEmitter();
  menuActionEmitter.on("actionCompleted", async state => {
    await titleScreen("Shorex");
    await displayMainMenu(state);
    await interpretMenuAction(state);
  });

  const config = new Configstore("shorex");

  const state: AppState = {
    config,
    currentBreak: config.get("currentBreak") || {
      continent: null,
      country: null,
      name: null,
      region: null,
      spotId: null
    },
    menuAction: null,
    menuActionEmitter
  };

  await titleScreen("Shorex");

  await displayMainMenu(state);

  await interpretMenuAction(state);
};

export default shorex;
