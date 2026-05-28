import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open } from "./utils";

const rules: KarabinerRules[] = [
  {
    description: "Mouse button5 -> Opt+Tab",
    manipulators: [
      {
        type: "basic",
        from: {
          pointing_button: "button5",
        },
        to: [{ key_code: "tab", modifiers: ["left_option"] }],
      },
    ],
  },
  {
    description: "Remap MX Master thumb button to Mission Control",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "tab",
          modifiers: { mandatory: ["left_control"] },
        },
        to: [{ key_code: "up_arrow", modifiers: ["control"] }],
        conditions: [
          {
            type: "device_if",
            identifiers: [{ vendor_id: 1133, product_id: 45081 }],
          },
        ],
      },
    ],
  },

  // Define the Hyper key itself
  // {
  //   description: "Hyper Key (⌃⌥⇧⌘)",
  //   manipulators: [
  //       {
  //         description: "Caps Lock -> Hyper Key",
  //         from: {
  //           key_code: "caps_lock",
  //           modifiers: {
  //             optional: ["any"],
  //           },
  //         },
  //         to: [
  //           {
  //             set_variable: {
  //               name: "hyper",
  //               value: 1,
  //             },
  //           },
  //         ],
  //         to_after_key_up: [
  //           {
  //             set_variable: {
  //               name: "hyper",
  //               value: 0,
  //             },
  //           },
  //         ],
  //         to_if_alone: [
  //           {
  //             key_code: "escape",
  //           },
  //         ],
  //         type: "basic",
  //       },
  //          {
  //            type: "basic",
  //            description: "Disable CMD + Tab to force Hyper Key usage",
  //            from: {
  //              key_code: "tab",
  //              modifiers: {
  //                mandatory: ["left_command"],
  //              },
  //            },
  //            to: [
  //              {
  //                key_code: "tab",
  //              },
  //            ],
  //          },
  //   ],
  // },
  // ...createHyperSubLayers({
  //   // b = "B"rowse
  //   b: {
  //     t: open("https://x.com/compose/post"),
  //     y: open("https://youtube.com"),
  //     r: open("https://reddit.com"),
  //   },
  //   // o = "Open" applications
  //   o: {
  //     1: app("1Password"),
  //     c: app("Windsurf"),
  //     s: app("Slack"),
  //     t: app("Warp"),
  //     z: app("zoom.us"),
  //     f: app("Finder"),
  //     m: app("Spotify"),
  //     b: app("Helium"),
  //     n: app("Obsidian"),
  //   },

  //   h: open(
  //     "raycast://extensions/raycast/system/hide-all-apps-except-frontmost"
  //   ),

  //   // TODO: This doesn't quite work yet.
  //   // l = "Layouts" via Raycast's custom window management
  //   // l: {
  //   //   // Coding layout
  //   //   c: shell`
  //   //     open -a "Visual Studio Code.app"
  //   //     sleep 0.2
  //   //     open -g "raycast://customWindowManagementCommand?position=topLeft&relativeWidth=0.5"

  //   //     open -a "Terminal.app"
  //   //     sleep 0.2
  //   //     open -g "raycast://customWindowManagementCommand?position=topRight&relativeWidth=0.5"
  //   //   `,
  //   // },
  // }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
