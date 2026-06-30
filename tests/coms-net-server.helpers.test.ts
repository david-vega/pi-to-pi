import { describe, expect, it } from "bun:test";
import { isLoopback, resolveUniqueName, tokensEqual, ulid } from "../scripts/coms-net-server";

describe("coms-net-server helpers", () => {
	it("tokensEqual returns true for exact match", () => {
		expect(tokensEqual("abc123", "abc123")).toBe(true);
	});

	it("tokensEqual returns false for different values and lengths", () => {
		expect(tokensEqual("abc123", "abc124")).toBe(false);
		expect(tokensEqual("abc123", "abc1234")).toBe(false);
	});

	it("isLoopback recognizes loopback hosts", () => {
		expect(isLoopback("127.0.0.1")).toBe(true);
		expect(isLoopback("::1")).toBe(true);
		expect(isLoopback("localhost")).toBe(true);
		expect(isLoopback("0.0.0.0")).toBe(false);
		expect(isLoopback("192.168.1.10")).toBe(false);
	});

	it("resolveUniqueName appends numeric suffixes for collisions", () => {
		const project: any = {
			agents: new Map([
				["s1", { name: "coder" }],
				["s2", { name: "coder2" }],
			]),
		};
		expect(resolveUniqueName(project, "planner")).toBe("planner");
		expect(resolveUniqueName(project, "coder")).toBe("coder3");
	});

	it("ulid returns 26-char ids and changes across calls", () => {
		const a = ulid();
		const b = ulid();
		expect(a).toHaveLength(26);
		expect(b).toHaveLength(26);
		expect(a).not.toBe(b);
	});
});
