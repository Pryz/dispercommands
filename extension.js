/*
 * Disper Commands
 *
 * Contact : Pryz <ju.pryz@gmail.com>.
 *
 *
 * Extension based on Panalcommads extension of Denoyse and adapted for my need.
 * Origin URL : http://denoyse.blogspot.fr/2012/02/panel-disper-or-panel-command-gnome.html 
 *
*/

// To execute commands.
const GLib = imports.gi.GLib;

// To add stuff to the Panel.
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

// To localize texts, if possible.
const Gettext = imports.gettext.domain('gnome-shell-extensions');
const _ = Gettext.gettext;

function Indicator() {
    this._init.apply(this, arguments);
}

Indicator.prototype = {
    __proto__: PanelMenu.SystemStatusButton.prototype,

    _init: function() {
        PanelMenu.SystemStatusButton.prototype._init.call(this, 'preferences-desktop-display');
        this._createMenu();
    },

    _createMenu: function() {
        this._addBoldText("Disper Commands");
        this._addCommand("Single Display", "disper --single");
        this._addCommand("Secondary Display", "disper --secondary");
        this._addCommand("Extend Displays", "disper --extend");
        this._addCommand("Clone Displays", "disper --clone");
    },

    _addBoldText: function(text) {
    	// Insert a bold text.
    	let item = new PopupMenu.PopupMenuItem(_(text));
        item.label.add_style_class_name('bold-text');
        item.actor.reactive = false;
        item.actor.can_focus = false;
        this.menu.addMenuItem(item);
    },

    _addCommand: function(label, command) {
    	// Insert a starter.
    	this.menu.addAction(_(label), function() { GLib.spawn_command_line_async(command); });
    },
}


function init() {}

let _indicator;

function enable() {
    _indicator = new Indicator();
    Main.panel.addToStatusArea('display', _indicator);
}

function disable() {
    _indicator.destroy();
}
