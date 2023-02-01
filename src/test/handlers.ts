import { rest } from "msw";

export const handlers = [
  rest.get("https://icanhazdadjoke.com/", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: "7h3oGtrOfxc",
        joke: "Joke from default handler",
      })
    );
  }),
];
