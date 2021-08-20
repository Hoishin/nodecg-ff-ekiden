import { CreateNodecgInstance } from "ts-nodecg/server";

import { MessageMap } from "./message";
import { ReplicantMap } from "./replicants";
import { BundleName } from "./types";

export type NodeCG = CreateNodecgInstance<
	BundleName,
	{
		//
	},
	ReplicantMap,
	MessageMap
>;
