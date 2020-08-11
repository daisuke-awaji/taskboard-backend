import { GraphQLClient, gql } from "graphql-request";
import { getTask } from "./query";
import { createTask, deleteTask } from "./mutation";

describe("dynamodb resolver", () => {
  const client = new GraphQLClient("http://192.168.3.10:20002/graphql", {
    headers: {
      // format さえ合っていればなんでもいいらしい
      Authorization:
        "euJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZDhjYTUyOC00OTMxLTQyNTQtOTI3My1lYTVlZTg1M2YyNzEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS91cy1lYXN0LTFfZmFrZSIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6InVzZXIxIiwiYXVkIjoiMmhpZmEwOTZiM2EyNG12bTNwaHNrdWFxaTMiLCJldmVudF9pZCI6ImIxMmEzZTJmLTdhMzYtNDkzYy04NWIzLTIwZDgxOGJkNzhhMSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxOTc0MjY0NDEyLCJwaG9uZV9udW1iZXIiOiIrMTIwNjIwNjIwMTYiLCJleHAiOjE1OTY5NDE2MjkwLCJpYXQiOjE1NjQyNjQ0MTMsImVtYWlsIjoidXNlckBkb21haW4uY29tIn0.mKvvVDRN07IvChh1uHloKz5NdUe2bRu6fyPOpzVbE_M",
    },
  });

  test("listTasks", async () => {
    const query = gql`
      {
        listTasks {
          nextToken
          tasks {
            id
            name
            status
          }
        }
      }
    `;
    const result = await client.request(query);
    expect(result).toHaveProperty("listTasks");
    expect(result.listTasks).toHaveProperty("tasks");
    expect(0).toBe(0);
  });

  test("createTask / getTask by id and status / deleteTask", async () => {
    const valiables = {
      id: "123456789",
      name: "新しいタスク",
      status: "NoStatus",
    };
    const created = await client.request(createTask, valiables);
    expect(created).toStrictEqual({ createTask: valiables });

    const got = await client.request(getTask, {
      id: valiables.id,
      status: valiables.status,
    });
    expect(got.getTask).toEqual(valiables);

    const deleted = await client.request(deleteTask, {
      id: valiables.id,
      status: valiables.status,
    });
    expect(deleted).toStrictEqual({ deleteTask: valiables });
  });
});
