package io.github.hackathon2018.stock.integration.tomita.dto;

import java.util.ArrayList;
import java.util.List;

public class Facts {
    private List<String> systems = new ArrayList<>();
    private List<String> subsystems = new ArrayList<>();
    private List<String> keywords = new ArrayList<>();
    private List<String> newIntegrations = new ArrayList<>();
    private List<String> modifyIntegrations = new ArrayList<>();
    private List<String> newPrintForms = new ArrayList<>();
    private List<String> modifyPrintForms = new ArrayList<>();

    public List<String> getSystems() {
        return systems;
    }

    public void setSystems(List<String> systems) {
        this.systems = systems;
    }

    public List<String> getSubsystems() {
        return subsystems;
    }

    public void setSubsystems(List<String> subsystems) {
        this.subsystems = subsystems;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public List<String> getNewIntegrations() {
        return newIntegrations;
    }

    public void setNewIntegrations(List<String> newIntegrations) {
        this.newIntegrations = newIntegrations;
    }

    public List<String> getModifyIntegrations() {
        return modifyIntegrations;
    }

    public void setModifyIntegrations(List<String> modifyIntegrations) {
        this.modifyIntegrations = modifyIntegrations;
    }

    public List<String> getNewPrintForms() {
        return newPrintForms;
    }

    public void setNewPrintForms(List<String> newPrintForms) {
        this.newPrintForms = newPrintForms;
    }

    public List<String> getModifyPrintForms() {
        return modifyPrintForms;
    }

    public void setModifyPrintForms(List<String> modifyPrintForms) {
        this.modifyPrintForms = modifyPrintForms;
    }

    @Override
    public String toString() {
        return "Facts{" +
            "systems=" + systems +
            ", subsystems=" + subsystems +
            ", keywords=" + keywords +
            ", newIntegrations=" + newIntegrations +
            ", modifyIntegrations=" + modifyIntegrations +
            ", newPrintForms=" + newPrintForms +
            ", modifyPrintForms=" + modifyPrintForms +
            '}';
    }
}
