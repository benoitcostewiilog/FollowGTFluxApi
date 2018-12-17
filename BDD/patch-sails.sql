CREATE TABLE IF NOT EXISTS `tables` (
  `name` varchar(255) DEFAULT NULL,
  `lastUpdated` datetime(3) DEFAULT NULL,
  `nbRow` int(11) DEFAULT '0',
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;


ALTER TABLE `wrk_mouvement` ADD `quantite` INT(4) NULL DEFAULT NULL AFTER `commentaire`;
ALTER TABLE `wrk_groupe` ADD `quantite` INT(4) NULL DEFAULT NULL AFTER `id_utilisateur`;
ALTER TABLE `wrk_inventaire` ADD `quantite` INT(4) NULL DEFAULT NULL AFTER `code_emplacement`;
ALTER TABLE `adm_supervision_parametrage` CHANGE `valeur` `valeur` TEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL;
INSERT INTO `adm_supervision_parametrage` (`id`, `nom`, `description`, `valeur`, `created_at`, `updated_at`) VALUES
(2, 'type_passage', NULL, '[{ "id": 1, "text": "Gare vide", "icon": "ios-cube-outline", "value": "Gare vide" },{ "id": 2, "text": "Navette pleine", "icon": "ios-cube", "value": "Navette pleine" }]', '0000-00-00 00:00:00', '2017-10-04 15:46:05');
ALTER TABLE `ref_emplacement` DROP PRIMARY KEY;
ALTER TABLE `ref_emplacement` ADD `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
INSERT INTO `adm_supervision_parametrage` (`id`, `nom`, `description`, `valeur`, `created_at`, `updated_at`) VALUES 
(NULL, 'gestion_emplacement', NULL, '1', '0000-00-00 00:00:00', CURRENT_TIMESTAMP), 
(NULL, 'auto_create_emplacement', NULL, '1', '0000-00-00 00:00:00', CURRENT_TIMESTAMP);
INSERT INTO `adm_supervision_parametrage` (`id`, `nom`, `description`, `valeur`, `created_at`, `updated_at`) VALUES (NULL, 'logout_possible_prise', NULL, '0', '0000-00-00 00:00:00', CURRENT_TIMESTAMP);
INSERT INTO `adm_supervision_parametrage` (`id`, `nom`, `description`, `valeur`, `created_at`, `updated_at`) VALUES (NULL, 'domaine_connexion', NULL, 'Ratier Figeac', '0000-00-00 00:00:00', CURRENT_TIMESTAMP);
INSERT INTO `adm_supervision_parametrage` (`id`, `nom`, `description`, `valeur`, `created_at`, `updated_at`) VALUES 
(NULL, 'show_colis_en_prise', NULL, '1', '0000-00-00 00:00:00', CURRENT_TIMESTAMP), 
(NULL, 'vidage_um_prise_produit', NULL, '1', '0000-00-00 00:00:00', CURRENT_TIMESTAMP);
INSERT INTO `adm_supervision_parametrage` (`id`, `nom`, `description`, `valeur`, `created_at`, `updated_at`) VALUES (NULL, 'vidage_um_depose_um', NULL, '1', '0000-00-00 00:00:00', CURRENT_TIMESTAMP);
INSERT INTO `adm_supervision_parametrage` (`id`, `nom`, `description`, `valeur`, `created_at`, `updated_at`) VALUES (NULL, 'scan_depose_obligatoire', NULL, '0', '0000-00-00 00:00:00', CURRENT_TIMESTAMP);
INSERT INTO `adm_supervision_parametrage` (`id`, `nom`, `description`, `valeur`, `created_at`, `updated_at`) VALUES (NULL, 'toggle_vidage_complet_um', NULL, '1', '0000-00-00 00:00:00', CURRENT_TIMESTAMP);

ALTER TABLE `adm_supervision_parametrage` CHANGE `nom` `nom` VARCHAR( 255 ) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;
INSERT INTO `adm_supervision_parametrage` (`id`, `nom`, `description`, `valeur`, `created_at`, `updated_at`) VALUES (NULL, 'first_input_method_emplacement', NULL, 'input', '0000-00-00 00:00:00', CURRENT_TIMESTAMP);
INSERT INTO `adm_supervision_parametrage` (`id`, `nom`, `description`, `valeur`, `created_at`, `updated_at`) VALUES (NULL, 'input_method_emplacement_list', NULL, '1', '0000-00-00 00:00:00', CURRENT_TIMESTAMP);
INSERT INTO `adm_supervision_parametrage` (`id`, `nom`, `description`, `valeur`, `created_at`, `updated_at`) VALUES (NULL, 'input_method_emplacement_input', NULL, '1', '0000-00-00 00:00:00', CURRENT_TIMESTAMP);
INSERT INTO `adm_supervision_parametrage` (`id`, `nom`, `description`, `valeur`, `created_at`, `updated_at`) VALUES (NULL, 'input_method_emplacement_scan', NULL, '1', '0000-00-00 00:00:00', CURRENT_TIMESTAMP);

