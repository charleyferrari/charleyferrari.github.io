library(dplyr)

setwd("C:/Users/Charley/Downloads/d3ghio")


agentsraw <- read.csv("AgentsRaw.csv")

futurelist <- c(colnames(agentsraw)[1:2],colnames(agentsraw)[14:length(colnames(agentsraw))])

currentlist <- colnames(agentsraw)[1:13]

agentsfuture <- agentsraw[,futurelist]
agentscurrent <- agentsraw[,currentlist]
colnames(agentsfuture) <- colnames(agentscurrent)

agentsfuture$ScoreType <- "Future"
agentscurrent$ScoreType <- "Current"

agents <- rbind(agentscurrent, agentsfuture)

write.csv(agents, "agents.csv", row.names=FALSE)

