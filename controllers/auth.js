import crypto from "crypto";
import express from "express";
import passport from "passport";
import * as LocalStrategy from "passport-local";

export const getAuth = (req, res) => {
	res.render("login.ejs");
};
