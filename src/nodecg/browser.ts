import {
	CreateNodecgInstance,
	CreateNodecgConstructor,
} from "ts-nodecg/browser";

import { MessageMap } from "./message";
import { ReplicantMap } from "./replicants";
import { BundleName } from "./types";

declare global {
	const nodecg: CreateNodecgInstance<
		BundleName,
		{
			//
		},
		ReplicantMap,
		MessageMap
	>;
	const NodeCG: CreateNodecgConstructor<
		BundleName,
		{
			//
		},
		ReplicantMap,
		MessageMap
	>;
}
