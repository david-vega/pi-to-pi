import { describe, expect, it } from "bun:test";

import {
  isLoopback,
  resolveUniqueName,
  tokensEqual,
} from "../scripts/coms-net-server";

describe("tokensEqual", () => {
  it("returns true for identical tokens", () => {
    expect(tokensEqual("secret-token", "secret-token")).toBe(true);
  });

  it("returns false for different tokens", () => {
    expect(tokensEqual("secret-token", "secret-token-2")).toBe(false);
  });

  it("returns false when lengths differ", () => {
    expect(tokensEqual("short", "shorter")).toBe(false);
  });
});

describe("isLoopback", () => {
  it("accepts loopback hosts", () => {
    expect(isLoopback("127.0.0.1")).toBe(true);
    expect(isLoopback("::1")).toBe(true);
    expect(isLoopback("localhost")).toBe(true);
  });

  it("rejects non-loopback hosts", () => {
    expect(isLoopback("0.0.0.0")).toBe(false);
    expect(isLoopback("192.168.1.10")).toBe(false);
    expect(isLoopback("example.com")).toBe(false);
  });
});

describe("resolveUniqueName", () => {
  it("returns desired name when unused", () => {
    const project = {
      agents: new Map(),
    } as any;

    expect(resolveUniqueName(project, "agent")).toBe("agent");
  });

  it("adds numeric suffix for collisions", () => {
    const project = {
      agents: new Map([
        ["s1", { name: "agent" }],
        ["s2", { name: "agent2" }],
        ["s3", { name: "agent3" }],
      ]),
    } as any;

    expect(resolveUniqueName(project, "agent")).toBe("agent4");
  });
});
